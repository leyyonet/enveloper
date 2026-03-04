import { assert, beforeAll, describe, it } from "vitest";
import { CausedError, initTest } from "@leyyo/common";

beforeAll(() => initTest());

describe("enveloper", () => {
  it("not symbol", () => {
    assert.throws(() => {
      throw new CausedError("invalid");
    });
  });
});
