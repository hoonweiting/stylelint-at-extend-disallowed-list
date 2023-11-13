# at-extend-disallowed-list

Stylelint rule for specifying a list of disallowed selectors to at-extend (`@extend`).

## Installation

```shell
npm install stylelint-at-extend-disallowed-list --save-dev
```

## Usage

Add this config to your Stylelint configuration file:

```json
{
  "plugins": ["stylelint-at-extend-disallowed-list"],
  "rules": {
    "plugin/at-extend-disallowed-list": [
      [
        "array",
        "of",
        "selectors"
      ]
    ]
  }
}
```

The [message secondary option](https://github.com/stylelint/stylelint/blob/main/docs/user-guide/configure.md#message) can accept the arguments of this rule.

## Options

`array|string`: `["array", "of", "selectors"]|"selector"`

> [!NOTE]
> This rule currently checks for exact string matches between the defined selector(s) and each `@extend` declaration. If any single `@extend` declaration uses multiple selectors, that exact string of multiple selectors has to be defined in the rule to be caught.

Given:

```json
[".foo", "%bar", "%foo\\/bar"]
```

The following patterns are considered problems:

```scss
a {
  @extend .foo;
}
```

```scss
a {
  @extend %bar;
}
```

```scss
a {
  @extend %foo\/bar;
}
```

The following patterns are *not* considered problems:

```scss
a {
  @extend .foo-bar;
}
```

```scss
a {
  @extend .foobar;
}
```

```scss
a {
  @extend %foo;
}
```

```scss
a {
  @extend .bar;
}
```

```scss
a {
  @extend %foobar;
}
```
