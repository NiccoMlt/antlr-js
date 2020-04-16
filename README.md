# ANTLR4 Tutorial - Javascript Project

Project set up following [Javascript Setup section of the ANTLR Mega Tutorial](https://tomassetti.me/antlr-mega-tutorial/#javascript-setup).
Reference to original repo at: <https://github.com/unosviluppatore/antlr-mega-tutorial>.

Use ```yarn install``` to install antlr4 dependency.
It should also invoke ```postinstall``` script that generates parser and lexer from grammar;
make sure that ```antlr4``` executable is available in path.
If not, parser and lexer can be easily generated using ```yarn antlr``` or:

```bash
antlr4 -Dlanguage=JavaScript -o gen/ src/Chat.g4
```
