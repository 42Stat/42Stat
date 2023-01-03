module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    // User typecript recommanded rules
    'plugin:@typescript-eslint/recommended',
    // Check import pattern
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    // Disable prettier - eslint conflict rules
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    browser: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
