import {Query} from "../../reader/query";
import {Keyword} from "../../syntax/keywords";
import {ILexer} from "../interface";
import {cleanUnquotedIdentifier} from "../lexer";
import {Token} from "../token";
import {Types} from "../types";

class Update implements ILexer {
  public options: string[] = [];
  public tokenise(query: Query): Query {
    let lastToken = "";
    query.lines.forEach((line) => {
      line.content.split(" ").forEach((word) => {
        let item = word.toLowerCase().trim();

        if (item === Keyword.Update) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else if (lastToken === Keyword.Update) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
                new Token(Types.TableReference, cleanUnquotedIdentifier(item)));
          }
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export {Update};
