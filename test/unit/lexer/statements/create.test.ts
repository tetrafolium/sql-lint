import {Create} from "../../../../src/lexer/statements/create";
import {Token} from "../../../../src/lexer/token";
import {putContentIntoLines} from "../../../../src/reader/reader";

test.each([
  [
    "CREATE ;",
    {
      lines : [
        {
          content : "CREATE ;",
          num : 1,
          tokens : [ new Token("keyword", "create") ],
        },
      ],
    },
  ],
  [
    "CREATE TABLE ;",
    {
      lines : [
        {
          content : "CREATE TABLE ;",
          num : 1,
          tokens : [
            new Token("keyword", "create"),
            new Token("option", "table"),
          ],
        },
      ],
    },
  ],
  [
    "CREATE DATABASE ;",
    {
      lines : [
        {
          content : "CREATE DATABASE ;",
          num : 1,
          tokens : [
            new Token("keyword", "create"),
            new Token("option", "database"),
          ],
        },
      ],
    },
  ],
])("It tokenises a `create` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Create();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
