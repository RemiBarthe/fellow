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
    'vue/no-unused-vars': 'error',
    'object-curly-spacing': ['error', 'always'],
    'template-curly-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error', { 'int32Hint': true }],
    'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'indent': ['error', 2],
    'key-spacing': ['error', { 'afterColon': true, 'beforeColon': false }]
  }
};
