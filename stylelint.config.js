/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// Stylelint Config
// ==============================================

// Rule reference
// See: https://stylelint.io/user-guide/rules/

// Disabling rules from CSS
// See: https://stylelint.io/user-guide/configuration/#turning-rules-off-from-within-your-css

module.exports = {
    "plugins": [
        "stylelint-scss"
    ],
    "rules": {
        // ----------------------------------------------
        // Possible errors

        "at-rule-no-unknown": [true, {
            "ignoreAtRules": ["function", "each", "if", "include", "mixin", "return"] // For Sass
        }],
        "block-no-empty": true,
        "color-no-invalid-hex": true,
        "comment-no-empty": true,
        "declaration-block-no-duplicate-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "font-family-no-duplicate-names": true,
        "font-family-no-missing-generic-family-keyword": true,
        "function-calc-no-unspaced-operator": true,
        "function-linear-gradient-no-nonstandard-direction": true,
        "keyframe-declaration-no-important": true,
        "media-feature-name-no-unknown": true,
        "no-descending-specificity": null, // TODO - many false positives, but possible improvements.
        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,
        "no-empty-source": true,
        "no-extra-semicolons": true,
        "no-invalid-double-slash-comments": true,
        "property-no-unknown": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-no-unknown": true,
        "selector-type-no-unknown": true,
        "string-no-newline": true,
        "unit-no-unknown": true,

        // ----------------------------------------------
        // Limit language features

        "at-rule-blacklist": null,
        "at-rule-no-vendor-prefix": true,
        "at-rule-whitelist": null,
        "color-named": "never",
        "color-no-hex": null,
        "comment-word-blacklist": null,
        "custom-media-pattern": null,
        "custom-property-pattern": null,
        "declaration-block-no-redundant-longhand-properties": true,
        "declaration-no-important": true,
        "declaration-property-unit-disallowed-list": {
            "/^animation/": ["s"]
        },
        "declaration-property-unit-whitelist": null,
        "declaration-property-value-blacklist": null,
        "declaration-property-value-whitelist": null,
        "declaration-block-single-line-max-declarations": 1,
        "function-blacklist": null,
        "function-url-no-scheme-relative": true,
        "function-url-scheme-blacklist": null,
        "function-url-scheme-whitelist": null,
        "function-whitelist": null,
        "max-nesting-depth": 2,
        "media-feature-name-blacklist": null,
        "media-feature-name-no-vendor-prefix": true,
        "media-feature-name-whitelist": null,
        "no-unknown-animations": null, // Because animations are defined separate from usage
        "number-max-precision": 3,
        "property-blacklist": null,
        "property-no-vendor-prefix": true,
        "property-whitelist": null,
        "selector-attribute-operator-blacklist": null,
        "selector-attribute-operator-whitelist": null,
        "selector-class-pattern": null,
        "selector-combinator-blacklist": null,
        "selector-combinator-whitelist": null,
        "selector-id-pattern": null,
        "selector-max-attribute": null,
        "selector-max-class": 3,
        "selector-max-combinators": 3,
        "selector-max-compound-selectors": 3,
        "selector-max-empty-lines": 0,
        "selector-max-id": 1,
        "selector-max-pseudo-class": null,
        "selector-max-specificity": "0,4,0",
        "selector-max-type": [2, {
            "ignore": ["child"]
        }],
        "selector-max-universal": 1,
        "selector-nested-pattern": null,
        "selector-no-qualifying-type": true,
        "selector-no-vendor-prefix": true,
        "selector-pseudo-class-blacklist": null,
        "selector-pseudo-class-whitelist": null,
        "selector-pseudo-element-blacklist": null,
        "selector-pseudo-element-whitelist": null,
        "shorthand-property-no-redundant-values": true,
        "time-min-milliseconds": null,
        "unit-blacklist": null,
        "unit-whitelist": null,
        "value-no-vendor-prefix": true,

        // ----------------------------------------------
        // Stylistic issues

        "at-rule-empty-line-before": ["always", {
            "ignore": ["after-comment", "blockless-after-same-name-blockless", "inside-block"]
        }],
        "at-rule-name-case": "lower",
        "at-rule-name-newline-after": null, // Needs "never" option.
        "at-rule-name-space-after": "always",
        "at-rule-semicolon-newline-after": "always",
        "at-rule-semicolon-space-before": "never",
        "block-closing-brace-empty-line-before": null, // Because doesn't match code style for media queries.
        "block-closing-brace-newline-after": null, // Because it fails on media queries.
        "block-closing-brace-newline-before": "always-multi-line",
        "block-closing-brace-space-after": null, // Because "never" incorrectly treats newlines as single spaces.
        "block-closing-brace-space-before": "always-single-line",
        "block-opening-brace-newline-after": "always-multi-line",
        "block-opening-brace-newline-before": null, // Because missing "never" option is needed.
        "block-opening-brace-space-after": "always-single-line",
        "block-opening-brace-space-before": null, // Because "always" fails on multiple spaces (for code alignment).
        "comment-empty-line-before": ["always", {
            "ignore": ["after-comment", "stylelint-commands"]
        }],
        "comment-whitespace-inside": "always",
        "color-hex-case": "upper",
        "color-hex-length": "short",
        "color-named": "never",
        "custom-property-empty-line-before": "never",
        "declaration-bang-space-after": "never",
        "declaration-bang-space-before": null, // Because "always" fails on multiple spaces (code alignment).
        "declaration-colon-newline-after": "always-multi-line",
        "declaration-colon-space-after": null, // Because "always-single-line" fails on multiple spaces (code alignment).
        "declaration-colon-space-before": "never",
        "declaration-empty-line-before": ["never", {
            "ignore": ["after-comment"]
        }],
        "declaration-block-semicolon-newline-after": "always",
        "declaration-block-semicolon-newline-before": "never-multi-line",
        "declaration-block-semicolon-space-after": "always-single-line",
        "declaration-block-semicolon-space-before": "never",
        "declaration-block-trailing-semicolon": "always",
        "font-family-name-quotes": "always-where-recommended",
        "font-weight-notation": "named-where-possible",
        "function-comma-newline-after": "always-multi-line",
        "function-comma-space-after": "always-single-line",
        "function-comma-space-before": "never",
        "function-max-empty-lines": 0,
        "function-name-case": "lower",
        "function-parentheses-newline-inside": "always-multi-line",
        "function-parentheses-space-inside": "never",
        "function-url-quotes": "never",
        "function-whitespace-after": "always",
        "indentation": 4,
        "length-zero-no-unit": true,
        "max-empty-lines": 2,
        "max-line-length": [130, {
            "ignore": ["non-comments"] // Only fail for super long comments.
        }],
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-case": "lower",
        "media-feature-parentheses-space-inside": "never",
        "media-feature-range-operator-space-after": "always",
        "media-feature-range-operator-space-before": "always",
        "media-query-list-comma-newline-after": "always-multi-line",
        "media-query-list-comma-newline-before": "never-multi-line",
        "media-query-list-comma-space-after": "always-single-line", // Because "always" requires a single space in multi-line mode.
        "media-query-list-comma-space-before": "never",
        "no-eol-whitespace": true,
        "no-missing-end-of-source-newline": true,
        "number-leading-zero": "always",
        "number-no-trailing-zeros": true,
        "property-case": "lower",
        "rule-empty-line-before": ["always-multi-line", {
            "ignore": ["after-comment", "inside-block"]
        }],
        "selector-attribute-brackets-space-inside": "never",
        "selector-attribute-operator-space-after": "never",
        "selector-attribute-operator-space-before": "never",
        "selector-attribute-quotes": "always",
        "selector-combinator-space-after": "always",
        "selector-combinator-space-before": null, // Because "always" fails on multiple spaces (code alignment).
        "selector-descendant-combinator-no-non-space": null, // Because "true" fails on multiple spaces (code alignment).
        "selector-list-comma-newline-after": "always-multi-line",
        "selector-list-comma-newline-before": "never-multi-line",
        "selector-list-comma-space-after": "always-single-line",
        "selector-list-comma-space-before": "never",
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-class-parentheses-space-inside": "never",
        "selector-pseudo-element-case": "lower",
        "selector-pseudo-element-colon-notation": "double",
        "selector-type-case": "lower",
        "string-quotes": ["single", {
            "avoidEscape": true
        }],
        "unit-case": "lower",
        "value-keyword-case": "lower",
        "value-list-comma-newline-after": "always-multi-line",
        "value-list-comma-newline-before": "never-multi-line",
        "value-list-comma-space-after": "always-single-line",
        "value-list-comma-space-before": "never",
        "value-list-max-empty-lines": 0,

        // ----------------------------------------------
        // Plugin: stylelint-scss
        // See: https://github.com/kristerkari/stylelint-scss

        "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-else-closing-brace-space-after": "always-intermediate",
        "scss/at-else-empty-line-before": "never",
        "scss/at-else-if-parentheses-space-before": "always",
        "scss/at-extend-no-missing-placeholder": true,
        "scss/at-function-named-arguments": null,
        "scss/at-function-parentheses-space-before": "always",
        "scss/at-function-pattern": null,
        "scss/at-if-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-if-closing-brace-space-after": "always-intermediate",
        "scss/at-import-no-partial-leading-underscore": true,
        "scss/at-import-partial-extension-blacklist": null,
        "scss/at-import-partial-extension-whitelist": null,
        "scss/at-mixin-argumentless-call-parentheses": "never",
        "scss/at-mixin-named-arguments": null,
        "scss/at-mixin-parentheses-space-before": "always",
        "scss/at-mixin-pattern": null,
        "scss/at-rule-no-unknown": true,
        "scss/declaration-nested-properties": "never",
        "scss/declaration-nested-properties-no-divided-groups": true,
        "scss/dollar-variable-colon-newline-after": "always-multi-line",
        "scss/dollar-variable-colon-space-after": "at-least-one-space",
        "scss/dollar-variable-colon-space-before": "never",
        "scss/dollar-variable-default": true,
        "scss/dollar-variable-empty-line-before": null, // Because exceptions to "always" are insufficient.
        "scss/dollar-variable-no-missing-interpolation": true,
        "scss/dollar-variable-pattern": null,
        "scss/double-slash-comment-empty-line-before": null,
        "scss/double-slash-comment-inline": null,
        "scss/double-slash-comment-whitespace-inside": null,
        "scss/media-feature-value-dollar-variable": null,
        "scss/no-duplicate-dollar-variables": true,
        "scss/operator-no-newline-after": true,
        "scss/operator-no-newline-before": true,
        "scss/operator-no-unspaced": true,
        "scss/partial-no-import": true,
        "scss/percent-placeholder-pattern": null,
        "scss/selector-no-redundant-nesting-selector": true
    },
    "syntax": "scss"
};
