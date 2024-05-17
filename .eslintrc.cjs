module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es2021": true
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
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
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
