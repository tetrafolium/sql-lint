import { Query } from "../../reader/query";
import { Keyword } from "../../syntax/keywords";
import { ILexer } from "../interface";
import { cleanUnquotedIdentifier } from "../lexer";
import { Token } from "../token";
import { Types } from "../types";

class Truncate implements ILexer {
  public options: string[] = ["table"];

  public tokenise(query: Query): Query {
    let lastToken = "";

    query.lines.forEach((line) => {
      line.content.split(" ").forEach((word) => {
        let item = word.toLowerCase().trim();
        if (item === Keyword.Truncate) {
          line.tokens.push(new Token(Types.Keyword, item));
        } else if (lastToken === Keyword.Truncate) {
          item = cleanUnquotedIdentifier(item);

          if (item.length > 0) {
            line.tokens.push(
              new Token(Types.Option, cleanUnquotedIdentifier(item))
            );
          }
        }
        lastToken = item;
      });
    });

    return query;
  }
}

export { Truncate };
