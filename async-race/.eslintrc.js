module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-typescript/base",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
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
        "no-console": "off"
    }
};
