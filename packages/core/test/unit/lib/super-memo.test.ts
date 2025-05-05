import { test, expect } from "vitest";
import { item, sm2 } from "../../../src/lib/super-memo";

test("super-memo", () => {
  expect(sm2(item(1, 2.5, 1, 0))).toStrictEqual(item(1, 1.7, 1, 0));
  expect(sm2(item(1, 2.5, 1, 0))).toStrictEqual(item(1, 1.7, 1, 0));
  expect(sm2(item(1, 1.7, 1, 0))).toStrictEqual(item(1, 1.3, 1, 0));
  expect(sm2(item(1, 1.3, 1, 0))).toStrictEqual(item(1, 1.3, 1, 0));

  expect(sm2(item(1, 2.5, 1, 1))).toStrictEqual(item(1, 1.96, 1, 1));
  expect(sm2(item(1, 1.96, 1, 1))).toStrictEqual(item(1, 1.42, 1, 1));
  expect(sm2(item(1, 1.42, 1, 1))).toStrictEqual(item(1, 1.3, 1, 1));
  expect(sm2(item(1, 1.3, 1, 1))).toStrictEqual(item(1, 1.3, 1, 1));

  expect(sm2(item(1, 2.5, 1, 2))).toStrictEqual(item(1, 2.18, 1, 2));
  expect(sm2(item(1, 2.18, 1, 2))).toStrictEqual(item(1, 1.86, 1, 2));
  expect(sm2(item(1, 1.86, 1, 2))).toStrictEqual(item(1, 1.54, 1, 2));
  expect(sm2(item(1, 1.54, 1, 2))).toStrictEqual(item(1, 1.3, 1, 2));

  expect(sm2(item(1, 2.5, 1, 3))).toStrictEqual(item(1, 2.36, 2, 3));
  expect(sm2(item(1, 2.36, 2, 3))).toStrictEqual(item(6, 2.22, 3, 3));
  expect(sm2(item(6, 2.22, 3, 3))).toStrictEqual(item(14, 2.08, 4, 3));
  expect(sm2(item(14, 2.08, 4, 3))).toStrictEqual(item(28, 1.94, 5, 3));

  expect(sm2(item(1, 2.5, 1, 4))).toStrictEqual(item(1, 2.5, 2, 4));
  expect(sm2(item(1, 2.5, 2, 4))).toStrictEqual(item(6, 2.5, 3, 4));
  expect(sm2(item(6, 2.5, 3, 4))).toStrictEqual(item(15, 2.5, 4, 4));
  expect(sm2(item(15, 2.5, 4, 4))).toStrictEqual(item(38, 2.5, 5, 4));

  expect(sm2(item(1, 2.5, 1, 5))).toStrictEqual(item(1, 2.6, 2, 5));
  expect(sm2(item(1, 2.6, 2, 5))).toStrictEqual(item(6, 2.7, 3, 5));
  expect(sm2(item(6, 2.7, 3, 5))).toStrictEqual(item(17, 2.8, 4, 5));
  expect(sm2(item(17, 2.8, 4, 5))).toStrictEqual(item(48, 2.9, 5, 5));
});
