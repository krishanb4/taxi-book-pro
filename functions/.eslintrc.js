module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "import/no-unresolved": 0,
    "quotes": "off",
    "indent": "off",
    "space-before-function-paren": "off",
    "require-jsdoc": "off",
    "eol-last": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "max-len": "off",
    "valid-jsdoc": "off",
    "no-trailing-spaces": "off",
    "padded-blocks": "off",
    "keyword-spacing": "off",
    "camelcase": "off",
    "comma-dangle": "off",
    "space-before-blocks": "off",
    "no-multi-spaces": "off",
    "comma-spacing": "off",
  },
};
