/**
 * This error is triggered when a CREATE statement
 * has an invalid option following the 'CREATE'.
 *
 * It would trigger for this:
 *   CREATE RUBBISH thing;
 * It wouldn't trigger for this:
 *   CREATE TABLE test;
 */

import {Create} from "../../barrel/statements";
import {IChecker} from "../interface";

import {InvalidOption} from "./invalidOption";

class InvalidCreateOption extends InvalidOption implements IChecker {
  public checker = new Create();
  public appliesTo = [ "create" ];
}

export {InvalidCreateOption};
