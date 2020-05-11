module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard-jsx",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "prettier"
  ],
  "rules": {
    "react/prop-types": 0,
    "no-case-declarations": 0,
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react/no-deprecated": [
      "error"
    ],
    "react/no-unescaped-entities": [
      "error",
      {
        "forbid": [">", "}"]
      }
    ]
  }
}