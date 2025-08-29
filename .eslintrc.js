module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
