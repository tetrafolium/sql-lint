import {Query} from "../../reader/query";
import {Keyword} from "../../syntax/keywords";
import {ILexer} from "../interface";
import {cleanUnquotedIdentifier} from "../lexer";
import {Token} from "../token";
import {Types} from "../types";

class Create implements ILexer {
  public options: string[] = [
    "algorithm",
    "database",
    "definer",
    "event",
    "function",
    "index",
    "or",
    "procedure",
    "server",
    "schema",
    "table",
    "tablespace",
    "temporary",
    "trigger",
    "user",
    "unique",
    "view",
  ];

  public tokenise(query: Query): Query {
    let lastToken = "";

    query.lines.forEach((line) => {
      line.content.split(" ").forEach((word) => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Create) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else if (lastToken === Keyword.Create) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
                new Token(Types.Option, cleanUnquotedIdentifier(item)));
          }
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export {Create};
