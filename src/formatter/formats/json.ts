import { CheckerResult } from "../../checker/checkerResult";
import { IFormat } from "../interface";

class JsonFormat implements IFormat {
  public getMessage(prefix: string, result: CheckerResult, verbosity: number) {
    const message = {
      source: prefix,
      error: result.content,
      line: result.line,
      additionalInformation: "",
    };

    if (verbosity) {
      message.additionalInformation = result.additionalInformation;
    }

    return JSON.stringify(message);
  }
}

export { JsonFormat };
