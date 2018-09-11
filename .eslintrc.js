module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-console": 0,
    "no-undef": [0, 0],
    "react/prop-types": [
      0,
      0
    ],
    "indent": [
      0,
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};