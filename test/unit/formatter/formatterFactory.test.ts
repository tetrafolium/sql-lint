import {JsonFormat} from "../../../src/formatter/formats/json";
import {SimpleFormat} from "../../../src/formatter/formats/simple";
import {FormatterFactory} from "../../../src/formatter/formatterFactory";

test.each([
  [ "an-invalid-format", SimpleFormat ],
  [ "simple", SimpleFormat ],
  [ "", SimpleFormat ],
  [ "json", JsonFormat ],
])("The FormatterFactory builds the correct Format",
   (format: string, expected) => {
     const factory = new FormatterFactory();
     const actual = factory.build(format);
     expect(actual).toBeInstanceOf(expected);
   });
