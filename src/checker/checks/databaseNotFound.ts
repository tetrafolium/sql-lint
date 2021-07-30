import {sprintf} from "sprintf-js";

import {Types} from "../../lexer/types";
import {Query} from "../../reader/query";
import {Check} from "../check";
import {CheckerResult} from "../checkerResult";
import {IChecker} from "../interface";

class DatabaseNotFound extends Check implements IChecker {
  public message = "Database '%s' does not exist.";
  public additionalInformation = "";
  public requiresConnection = true;
  public appliesTo = [ "select", "create", "update", "drop", "insert" ];
  public databases: string[];
  constructor(databases: any[]) {
    super();
    this.databases = databases.map((result) => result.Database);
  }
  public check(query: Query): CheckerResult {
    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (token.type === Types.TableReference) {
          const database = token.value;
          if (!this.databases.includes(database) && database !== ";") {
            return new CheckerResult(
                line.num, sprintf(this.prefix + this.message, database));
          }
        }
      }
    }

    return new CheckerResult(0, "");
  }
}

export {DatabaseNotFound};
