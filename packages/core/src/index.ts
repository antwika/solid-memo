export * from "./domain/index";
export * from "./IAuthService";
export * from "./ISolidService";
export * from "./IRepository";

export function greet(name: string): string {
  return `Hello, ${name}!`;
}
