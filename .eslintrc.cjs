/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    ignorePatterns: ['!**/.server', '!**/.client'],

    // Base config
    extends: ['eslint:recommended'],

    overrides: [
        // React
        {
            files: ['**/*.{ts,tsx}'],
            plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'import'],
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
            ],
            settings: {
                react: {
                    version: 'detect',
                },
                formComponents: ['Form'],
                linkComponents: [
                    { name: 'Link', linkAttribute: 'to' },
                    { name: 'NavLink', linkAttribute: 'to' },
                ],
                'import/internal-regex': '^~/',
                'import/resolver': {
                    node: {
                        extensions: ['.ts', '.tsx'],
                    },
                    typescript: {
                        alwaysTryTypes: true,
                    },
                },
            },
            rules: {
                'react/prop-types': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-empty-object-type': 'off',

                'no-empty-pattern': 'warn',

                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    {
                        argsIgnorePattern: '^_',
                        varsIgnorePattern: '^_',
                        destructuredArrayIgnorePattern: '^_',
                    },
                ],
                // 'no-restricted-syntax': [
                //     'error',
                //     {
                //         selector: 'NewExpression[callee.name="Response"]',
                //         message:
                //             'Direct use of the Response class is forbidden. Use the createResponse function instead.',
                //     },
                // ],
            },
        },
    ],
};
