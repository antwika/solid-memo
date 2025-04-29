import { env, schemas } from "@lib/env";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createEnv } from "@t3-oss/env-nextjs";

vi.mock("@t3-oss/env-nextjs", () => ({ createEnv: vi.fn() }));

describe("'schemas' (object) (named export)", () => {
  describe("nested 'server' (object)", () => {
    describe("nested 'NODE_ENV' (function)", () => {
      it("builds a zod schema of type 'enum' which accepts values 'development', 'test' and 'production'", () => {
        const { server } = schemas;
        expect(() => server.NODE_ENV().parse(undefined)).toThrow();
        expect(() => server.NODE_ENV().parse("an invalid value")).toThrow();
        expect(server.NODE_ENV().parse("development")).toBe("development");
        expect(server.NODE_ENV().parse("test")).toBe("test");
        expect(server.NODE_ENV().parse("production")).toBe("production");
      });
    });
  });

  describe("nested 'client' (object)", () => {
    describe("nested 'NEXT_PUBLIC_BASE_PATH' (function)", () => {
      it("builds a zod schema of type 'string' which can be any 'string', but it defaults to '/'", () => {
        const { client } = schemas;
        expect(client.NEXT_PUBLIC_BASE_PATH().parse(undefined)).toBe("/");
        expect(client.NEXT_PUBLIC_BASE_PATH().parse("")).toBe("");
        expect(client.NEXT_PUBLIC_BASE_PATH().parse("foo")).toBe("foo");
      });
    });
  });
});

describe("'env' (function) (named export)", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  describe("invokes 'createEnv' with an argument of type 'object' where its properties are derived from ...", () => {
    describe("constants", () => {
      it("defines property 'emptyStringAsUndefined' as 'true'", () => {
        // Act
        env();

        // Assert
        expect(createEnv).toHaveBeenCalledWith(
          expect.objectContaining({ emptyStringAsUndefined: true })
        );
      });
    });

    describe("when 'NODE_ENV' environment variable", () => {
      it("is undefined, then property 'runtimeEnv.NODE_ENV' is also undefined", () => {
        // Arrange
        vi.stubEnv("NODE_ENV", undefined);

        // Act
        env();

        // Assert
        expect(createEnv).toHaveBeenCalledWith(
          expect.objectContaining({
            runtimeEnv: expect.objectContaining({ NODE_ENV: undefined }),
          })
        );
      });

      it("is defined, then property 'runtimeEnv.NODE_ENV' is also that exact value'", () => {
        // Arrange
        vi.stubEnv("NODE_ENV", "production");

        // Act
        env();

        // Assert
        expect(createEnv).toHaveBeenCalledWith(
          expect.objectContaining({
            runtimeEnv: expect.objectContaining({ NODE_ENV: "production" }),
          })
        );
      });
    });

    describe("when 'NEXT_PUBLIC_BASE_PATH' environment variable", () => {
      it("is undefined, then property 'runtimeEnv.NEXT_PUBLIC_BASE_PATH' is also undefined", () => {
        // Arrange
        vi.stubEnv("NEXT_PUBLIC_BASE_PATH", undefined);

        // Act
        env();

        // Assert
        expect(createEnv).toHaveBeenCalledWith(
          expect.objectContaining({
            runtimeEnv: expect.objectContaining({
              NEXT_PUBLIC_BASE_PATH: undefined,
            }),
          })
        );
      });

      it("is defined, then property 'runtimeEnv.NEXT_PUBLIC_BASE_PATH' is also that exact value", () => {
        // Arrange
        vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "foobar");

        // Act
        env();

        // Assert
        expect(createEnv).toHaveBeenCalledWith(
          expect.objectContaining({
            runtimeEnv: expect.objectContaining({
              NEXT_PUBLIC_BASE_PATH: "foobar",
            }),
          })
        );
      });
    });

    describe("when 'SKIP_ENV_VALIDATION' environment variable", () => {
      it.each([
        [undefined, false],
        ["", false],
        ["false", true],
        ["true", true],
        ["0", true],
        ["1", true],
      ])(
        "is '%s', then property 'skipValidation' is '%s' (MUST be 'true' for any non-empty string, otherwise 'false')",
        (value, expected) => {
          // Arrange
          vi.stubEnv("SKIP_ENV_VALIDATION", value);

          // Act
          env();

          // Assert
          expect(createEnv).toHaveBeenCalledWith(
            expect.objectContaining({
              skipValidation: expected,
            })
          );
        }
      );
    });
  });

  it("returns the 'createEnv' result with no further processing", () => {
    // Arrange
    const mockEnv = {};

    vi.mocked(createEnv, { partial: true }).mockReturnValueOnce(mockEnv);

    // Act
    const result = env();

    // Assert
    expect(result).toBe(mockEnv);
  });
});
