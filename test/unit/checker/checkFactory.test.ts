import {
  DatabaseNotFound,
  InvalidAlterOption,
  InvalidCreateOption,
  InvalidDropOption,
  InvalidTruncateOption,
  MissingWhere,
  MySqlError,
  OddCodePoint,
  TableNotFound,
  UnmatchedParentheses,
} from "../../../src/barrel/checks";
import { CheckFactory } from "../../../src/checker/checkFactory";

test.each([
  ["missingWhere", MissingWhere],
  ["mySqlError", MySqlError],
  ["oddCodePoint", OddCodePoint],
])("The CheckFactory builds the correct check", (format: string, expected) => {
  const factory = new CheckFactory();
  const actual = factory.build(format);
  expect(actual).toBeInstanceOf(expected);
});
