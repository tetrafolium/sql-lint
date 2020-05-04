import { Drop } from "../../../../src/parser/statements/drop/drop";
import { putContentIntoLines } from "../../../../src/reader/reader";
import { Token } from "../../../../src/parser/token";

test.each([
  [
    "DROP TABLE ;",
    {
      lines: [
        {
          content: "DROP TABLE ;",
          num: 1,
          tokens: [new Token("keyword", "drop"), new Token("option", "table")]
        }
      ]
    }
  ],
  [
    "DROP DATABASE ;",
    {
      lines: [
        {
          content: "DROP DATABASE ;",
          num: 1,
          tokens: [
            new Token("keyword", "drop"),
            new Token("option", "database")
          ]
        }
      ]
    }
  ]
])("It tokenises a `drop` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Drop();
  const actual = tokeniser.parse(q[0]);
  expect(actual).toEqual(expected);
});
