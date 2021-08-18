import { Create, Drop, Select, Use } from "../../../src/barrel/statements";
import { StatementFactory } from "../../../src/lexer/statementFactory";

test.each([
  // Invalid ones default to Select
  ["an-invalid-format", Select],
  ["select", Select],
  ["use", Use],
  ["drop", Drop],
  ["create", Create],
  // Empty options default to Select
  ["", Select],
])(
  "The StatementFactory builds the correct statement",
  (format: string, expected) => {
    const factory = new StatementFactory();
    const actual = factory.build(format);
    expect(actual).toBeInstanceOf(expected);
  }
);
