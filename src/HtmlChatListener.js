const antlr4 = require('antlr4/index');
const ChatLexer = require('../gen/ChatLexer');
const ChatParser = require('../gen/ChatParser');
const ChatListener = require('../gen/ChatListener').ChatListener;

HtmlChatListener = function(res) {
    this.Res = res;
    ChatListener.call(this); // inherit default listener
    return this;
};

// inherit default listener
HtmlChatListener.prototype = Object.create(ChatListener.prototype);
HtmlChatListener.prototype.constructor = HtmlChatListener;

// override default listener behavior
HtmlChatListener.prototype.enterName = function(ctx) {
    this.Res.write("<strong>");
};

HtmlChatListener.prototype.exitName = function(ctx) {
    this.Res.write(ctx.WORD().getText());
    this.Res.write("</strong> ");
};

HtmlChatListener.prototype.enterColor = function(ctx) {
    const color = ctx.WORD().getText();
    this.Res.write('<span style="color: ' + color + '">');
};

HtmlChatListener.prototype.exitColor = function(ctx) {
    ctx.text += ctx.message().text;
    ctx.text += '</span>';
};

HtmlChatListener.prototype.exitEmoticon = function(ctx) {
    const emoticon = ctx.getText();

    if(emoticon === ':-)' || emoticon === ':)')
    {
        ctx.text = "🙂";
    }

    if(emoticon === ':-(' || emoticon === ':(')
    {
        ctx.text = "🙁";
    }
};

HtmlChatListener.prototype.exitMessage = function(ctx) {
    let text = '';

    for (let index = 0; index < ctx.children.length; index++ ) {
        if (ctx.children[index].text != null)
            text += ctx.children[index].text;
        else
            text += ctx.children[index].getText();
    }

    // If node is not child of line, it's child of color
    if(!(ctx.parentCtx instanceof ChatParser.ChatParser.LineContext))
    {
        ctx.text = text;
        // let color print the text
    }
    else
    {
        this.Res.write(text);
        this.Res.write("</p>");
    }
};

HtmlChatListener.prototype.enterCommand = function(ctx) {
    if(ctx.SAYS() != null)
        this.Res.write(ctx.SAYS().getText() + ':' + '<p>');
    if(ctx.SHOUTS() != null)
        this.Res.write(ctx.SHOUTS().getText() + ':' + '<p style="text-transform: uppercase">');
};

HtmlChatListener.prototype.exitLine = function(ctx) {
    this.Res.write("</p>");
};

exports.HtmlChatListener = HtmlChatListener;
