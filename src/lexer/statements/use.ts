import { Query } from "../../reader/query";
import { Keyword } from "../../syntax/keywords";
import { ILexer } from "../interface";
import { cleanUnquotedIdentifier } from "../lexer";
import { Token } from "../token";
import { Types } from "../types";

class Use implements ILexer {
  public options: string[] = [];
  public tokenise(query: Query): Query {
    query.lines.forEach((line) => {
      line.content.split(" ").forEach((word) => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Use) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
              new Token(Types.TableReference, cleanUnquotedIdentifier(item))
            );
          }
        }
      });
    });

    return query;
  }
}

export { Use };
