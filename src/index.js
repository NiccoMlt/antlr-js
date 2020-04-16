const http = require('http');
const antlr4 = require('antlr4/index');
const ChatLexer = require('../gen/ChatLexer');
const ChatParser = require('../gen/ChatParser');
let HtmlChatListener = require('./HtmlChatListener').HtmlChatListener;

http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    res.write(`
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <title>HTML chat</title>
            </head>
            <body>
    `);

    /*
     * you create the stream of chars from the input,
     * you give it to the lexer and it transforms them in tokens,
     * that are then interpreted by the parser.
     */
    const input = "john SHOUTS: hello @michael /pink/this will work/ :-) n";
    const chars = new antlr4.InputStream(input);
    const lexer = new ChatLexer.ChatLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new ChatParser.ChatParser(tokens);
    parser.buildParseTrees = true; // redundant, since the option already defaults to true
    const tree = parser.chat(); // set the root node of the tree as a chat rule
    const htmlChat = new HtmlChatListener(res);
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(htmlChat, tree);

    res.write(`
            </body>
        </html>
    `);
    res.end();

}).listen(1337);
