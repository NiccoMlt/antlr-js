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

HtmlChatListener.prototype.exitEmoticon = function(ctx) {
    const emoticon = ctx.getText();

    if(emoticon === ':-)' || emoticon === ':)')
    {
        this.Res.write("🙂");
    }

    if(emoticon === ':-(' || emoticon === ':(')
    {
        this.Res.write("🙁");
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
