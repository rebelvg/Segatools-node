module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "eol-last": [
            "error",
            "always"
        ],
        "no-console": 0,
        "no-unused-vars": 0,
        "no-var": "error",
        "eqeqeq": ["error", "always"],
        "curly": ["error", "all"],
        "no-multiple-empty-lines": ["error", { "max": 1 }]
    }
};
