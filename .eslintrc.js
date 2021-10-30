module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended'
    // 'plugin:vue/vue3-essential', // This option doesn't impose formatting rules
    // 'plugin:vue/vue3-strongly-recommended', // This option imposes formatting rules on your code to improve readability
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/template-curly-spacing': ['error', 'never'],
    'vue/space-in-parens': ['error', 'never'],
    'vue/space-infix-ops': ['error', { 'int32Hint': true }],
    'semi': ['error', 'always', { 'omitLastInOneLineBlock': true}]
  }
};
