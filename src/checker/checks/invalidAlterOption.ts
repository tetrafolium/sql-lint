import { Alter } from "../../barrel/statements";
import { IChecker } from "../interface";

import { InvalidOption } from "./invalidOption";

class InvalidAlterOption extends InvalidOption implements IChecker {
  public checker = new Alter();
  public appliesTo = ["alter"];
}

export { InvalidAlterOption };
