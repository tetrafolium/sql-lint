import {sprintf} from "sprintf-js";

import {ILexer} from "../../lexer/interface";
import {Types} from "../../lexer/types";
import {Query} from "../../reader/query";
import {Check} from "../check";
import {CheckerResult} from "../checkerResult";
import {IChecker} from "../interface";

class InvalidLimitQuantifier extends Check implements IChecker {
  public message: string =
      "Argument '%s' is not a valid quantifier for LIMIT clause.";
  public additionalInformation = "";
  public requiresConnection = false;
  public appliesTo = [ "select", "update", "delete", "insert" ];
  public checker: ILexer;

  public check(query: Query): CheckerResult {
    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (token.type === Types.RowCount && isNaN(Number(token.value))) {
          return new CheckerResult(
              line.num, sprintf(this.prefix + this.message, token.value));
        }
      }
    }
    return new CheckerResult(0, "");
  }
}

export {InvalidLimitQuantifier};
