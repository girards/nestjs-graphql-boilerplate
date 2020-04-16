module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:import/typescript",
    "plugin:sonarjs/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  rules: {

    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "explicit",
          constructors: "no-public",
          methods: "off",
          properties: "off",
          parameterProperties: "explicit",
        },
      },
    ],
    "no-param-reassign": "error",
  },
  overrides: [
    {
      files: ["**/migration/*.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off"
      },
    },
    {
      files: ["./src/graphql.ts"],
      rules: {
        "@typescript-eslint/camelcase": "off",
        "prettier/prettier": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["./**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-hardcoded-credentials": "off"
      },
    },
    {
      files: ["./**/*.entity.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "sonarjs/no-duplicate-string": "off", // for typeormconfiguration
      },
    },
    {
      files: ['./src/config/*.ts'],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      }
    }
  ],
};
