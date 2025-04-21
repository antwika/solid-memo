import { deepEqual } from "node:assert";
import test from "node:test";
import { item, sm2 } from "@lib/super-memo";

test("super-memo", () => {
  deepEqual(sm2(item(1, 2.5, 1, 0)), item(1, 1.7, 1, 0));
  deepEqual(sm2(item(1, 2.5, 1, 0)), item(1, 1.7, 1, 0));
  deepEqual(sm2(item(1, 1.7, 1, 0)), item(1, 1.3, 1, 0));
  deepEqual(sm2(item(1, 1.3, 1, 0)), item(1, 1.3, 1, 0));

  deepEqual(sm2(item(1, 2.5, 1, 1)), item(1, 1.96, 1, 1));
  deepEqual(sm2(item(1, 1.96, 1, 1)), item(1, 1.42, 1, 1));
  deepEqual(sm2(item(1, 1.42, 1, 1)), item(1, 1.3, 1, 1));
  deepEqual(sm2(item(1, 1.3, 1, 1)), item(1, 1.3, 1, 1));

  deepEqual(sm2(item(1, 2.5, 1, 2)), item(1, 2.18, 1, 2));
  deepEqual(sm2(item(1, 2.18, 1, 2)), item(1, 1.86, 1, 2));
  deepEqual(sm2(item(1, 1.86, 1, 2)), item(1, 1.54, 1, 2));
  deepEqual(sm2(item(1, 1.54, 1, 2)), item(1, 1.3, 1, 2));

  deepEqual(sm2(item(1, 2.5, 1, 3)), item(1, 2.36, 2, 3));
  deepEqual(sm2(item(1, 2.36, 2, 3)), item(6, 2.22, 3, 3));
  deepEqual(sm2(item(6, 2.22, 3, 3)), item(14, 2.08, 4, 3));
  deepEqual(sm2(item(14, 2.08, 4, 3)), item(28, 1.94, 5, 3));

  deepEqual(sm2(item(1, 2.5, 1, 4)), item(1, 2.5, 2, 4));
  deepEqual(sm2(item(1, 2.5, 2, 4)), item(6, 2.5, 3, 4));
  deepEqual(sm2(item(6, 2.5, 3, 4)), item(15, 2.5, 4, 4));
  deepEqual(sm2(item(15, 2.5, 4, 4)), item(38, 2.5, 5, 4));

  deepEqual(sm2(item(1, 2.5, 1, 5)), item(1, 2.6, 2, 5));
  deepEqual(sm2(item(1, 2.6, 2, 5)), item(6, 2.7, 3, 5));
  deepEqual(sm2(item(6, 2.7, 3, 5)), item(17, 2.8, 4, 5));
  deepEqual(sm2(item(17, 2.8, 4, 5)), item(48, 2.9, 5, 5));
});
