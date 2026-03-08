module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "react-app",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // 1. The React Refresh rule (kept exactly as it was)
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // 2. Turn off Prop-Types validation entirely
    "react/prop-types": "off",

    // 3. Turn unused variables into yellow warnings instead of red errors
    "no-unused-vars": "warn",
  },
};
