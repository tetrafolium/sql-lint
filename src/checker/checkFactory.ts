import {
  DatabaseNotFound,
  HungarianNotation,
  InvalidAlterOption,
  InvalidCreateOption,
  InvalidDropOption,
  InvalidLimitQuantifier,
  InvalidTruncateOption,
  MissingWhere,
  MySqlError,
  OddCodePoint,
  TrailingWhitespace,
  UnmatchedParentheses,
} from "../barrel/checks";

import { IChecker } from "./interface";

class CheckFactory {
  public build(check: string): IChecker {
    // any is actually IChecker
    const checkMap: { [key: string]: any } = {
      databaseNotFound: DatabaseNotFound,
      invalidAlterOption: InvalidAlterOption,
      invalidCreateOption: InvalidCreateOption,
      invalidDropOption: InvalidDropOption,
      invalidLimitQuantifier: InvalidLimitQuantifier,
      invalidTruncateOption: InvalidTruncateOption,
      missingWhere: MissingWhere,
      mySqlError: MySqlError,
      oddCodePoint: OddCodePoint,
      trailingWhitespace: TrailingWhitespace,
      unmatchedParentheses: UnmatchedParentheses,
      hungarianNotation: HungarianNotation,
    };

    return new checkMap[check]();
  }
}

export { CheckFactory };
