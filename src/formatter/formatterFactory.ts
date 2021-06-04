import {JsonFormat} from "./formats/json";
import {SimpleFormat} from "./formats/simple";
import {IFormat} from "./interface";

class FormatterFactory {
  public build(format: string): IFormat {
    let formatter: IFormat = new SimpleFormat();

    const formatMap: {[key: string]: IFormat} = {
      simple : new SimpleFormat(),
      json : new JsonFormat(),
    };

    if (Object.keys(formatMap).includes(format)) {
      formatter = formatMap[format];
    }

    return formatter;
  }
}

export {FormatterFactory};
