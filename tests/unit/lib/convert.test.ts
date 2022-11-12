import { kebabCase2CamelCase, camelCase2KebabCase, pascalCase2CamelCase, pascalCase2KebabCase, camelCase2PascalCase, kebabCase2PascalCase } from "src/lib/convert";

describe('convert', () => {
  describe('kebabCase2CamelCase', () => {
    it.each([
      { input: 'foo', expected: 'foo' },
      { input: 'foo-bar', expected: 'fooBar' },
      { input: 'foo-bar-baz', expected: 'fooBarBaz' },
    ])('converts $input to $expected', ({ input, expected }) => {
      expect(kebabCase2CamelCase(input)).toStrictEqual(expected);
    });
  });

  describe('camelCase2KebabCase', () => {
    it.each([
      { input: 'foo', expected: 'foo' },
      { input: 'fooBar', expected: 'foo-bar' },
      { input: 'fooBarBaz', expected: 'foo-bar-baz' },
    ])('converts $input to $expected', ({ input, expected }) => {
      expect(camelCase2KebabCase(input)).toStrictEqual(expected);
    });
  });

  describe('pascalCase2CamelCase', () => {
    it.each([
      { input: 'Foo', expected: 'foo' },
      { input: 'FooBar', expected: 'fooBar' },
      { input: 'FooBarBaz', expected: 'fooBarBaz' },
    ])('converts $input to $expected', ({ input, expected }) => {
      expect(pascalCase2CamelCase(input)).toStrictEqual(expected);
    });
  });

  describe('pascalCase2KebabCase', () => {
    it.each([
      { input: 'Foo', expected: 'foo' },
      { input: 'FooBar', expected: 'foo-bar' },
      { input: 'FooBarBaz', expected: 'foo-bar-baz' },
    ])('converts $input to $expected', ({ input, expected }) => {
      expect(pascalCase2KebabCase(input)).toStrictEqual(expected);
    });
  });

  describe('camelCase2PascalCase', () => {
    it.each([
      { input: 'foo', expected: 'Foo' },
      { input: 'fooBar', expected: 'FooBar' },
      { input: 'fooBarBaz', expected: 'FooBarBaz' },
    ])('converts $input to $expected', ({ input, expected }) => {
      expect(camelCase2PascalCase(input)).toStrictEqual(expected);
    });
  });

  describe('kebabCase2PascalCase', () => {
    it.each([
      { input: 'foo', expected: 'Foo' },
      { input: 'foo-bar', expected: 'FooBar' },
      { input: 'foo-bar-baz', expected: 'FooBarBaz' },
    ])('converts $input to $expected', ({ input, expected }) => {
      expect(kebabCase2PascalCase(input)).toStrictEqual(expected);
    });
  });
});
