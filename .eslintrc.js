// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "object-curly-spacing": ["error", "always"], //强制在花括号中使用一致的空格
    "block-spacing": ["error", "never"], // 强制在代码块中开括号前和闭括号后有空格
    "space-infix-ops": 2, // 要求操作符周围有空格
    "eqeqeq": 2, // 要求使用 === 和 !==
    "rest-spread-spacing": 2, // 禁止剩余和扩展运算符及其表达式之间有空格
    "prefer-const": 2, // 要求使用 const 声明那些声明后不再被修改的变量
  }
}
