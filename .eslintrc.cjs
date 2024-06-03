module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "airbnb-base",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:prettier/recommended"
    ],
    "settings": {
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        }
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 13,
        "project": "./tsconfig.json"
    },
    "rules": {
        "no-underscore-dangle":  "off",
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "class-methods-use-this": "off",
        "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
        "no-param-reassign": ["error", { "props": false }],
        "no-unused-expressions": "off",
        "default-case": "off",
        "quotes": [
            "error",
            "double",
            {
              "avoidEscape": true,
              "allowTemplateLiterals": true
            }
          ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "": "never",
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            }
         ]
    }
}
