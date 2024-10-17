/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        'no-empty-function': 'off',
        'no-case-declarations': 'off',
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-namespace': 'off',
        /* Нельзя писать неиспользуемые переменные, только если они находятся в параметрах */
        '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-inferrable-types': ['off'],
        'no-inferrable-types': 'off',
        'no-extra-boolean-cast': 'off',
        'no-inner-declarations': 'off',
        camelcase: 'error',
        'vue/require-default-prop': 'off',
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    ['UNIQUE', 'SLOT'],
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'EVENTS',
                    'CONTENT'
                ],
                alphabetical: true
            }
        ],
        'vue/script-setup-uses-vars': 'error',
        'vue/multi-word-component-names': 0,
        'vue/first-attribute-linebreak': [
            1,
            {
                singleline: 'ignore',
                multiline: 'below'
            }
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ]
    }
};

