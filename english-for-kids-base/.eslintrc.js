module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-typescript/base"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "tsconfigRootDir": __dirname,
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "linebreak-style": ["error", "windows"],
        "@typescript-eslint/lines-between-class-members": [
            "error",
            "always",
            { "exceptAfterSingleLine": true }
        ],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error", { "functions": false }]
    }
};
