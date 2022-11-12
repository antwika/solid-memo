export const kebabCase2CamelCase = (name: string) => name.split('-')
    .map((part, i) => i > 0 ? part.charAt(0).toUpperCase() + part.substring(1).toLowerCase() : part.toLowerCase())
    .join('');

export const camelCase2KebabCase = (name: string) => name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export const pascalCase2CamelCase = (name: string) => name.charAt(0).toLowerCase() + name.substring(1);

export const pascalCase2KebabCase = (name: string) => camelCase2KebabCase(pascalCase2CamelCase(name));

export const camelCase2PascalCase = (name: string) => name.charAt(0).toUpperCase() + name.substring(1);

export const kebabCase2PascalCase = (name: string) => kebabCase2CamelCase(name).charAt(0).toUpperCase() + kebabCase2CamelCase(name).substring(1);
