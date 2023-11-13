const { ruleName, messages } = require("./..");

testRule({
  ruleName,
  config: [""],
  accept: [{
    code: "@extend .foo;",
    description: "Empty rule."
  }],
});

testRule({
  ruleName,
  config: "",
  accept: [{
    code: "@extend .foo;",
    description: "Empty rule."
  }],
});

testRule({
  ruleName,
  config: [".foo"],
  accept: [{
    code: "@extend %foo;",
    description: "Different selector, allowed.",
  }, {
    code: "@extend .foo-bar;",
    description: "Different selector, allowed.",
  }, {
    code: "@extend foo;",
    description: "Different selector, allowed.",
  }],
  reject: [{
    code: "@extend .foo;",
    message: messages.rejected(".foo"),
    description: "Matching selector, not allowed.",
    line: 1,
  }],
});

testRule({
  ruleName,
  config: [["%foo-bar", ".foo/bar"]],
  accept: [{
    code: "@extend .foo-bar;",
    description: "Different selector, allowed.",
  }, {
    // eslint-disable-next-line no-useless-escape
    code: "@extend %foo\/bar;",
    description: "Different selector, allowed.",
  }, {
    code: "@extend %foobar;",
    description: "Different selector, allowed.",
  }, {
    code: "@extend .foobar",
    description: "Different selector, allowed.",
  }, {
    code: "@extend %foo;",
    description: "Different selector, allowed.",
  }, {
    code: "@extend .foo;",
    description: "Different selector, allowed.",
  }, {
    code: "@extend bar;",
    description: "Different selector, allowed.",
  }],
  reject: [{
    code: "@extend %foo-bar;",
    message: messages.rejected("%foo-bar"),
    description: "Matching selector, not allowed.",
    line: 1,
  }, {
    // eslint-disable-next-line no-useless-escape
    code: "@extend .foo\/bar;",
    message: messages.rejected(".foo/bar"),
    description: "Matching selector, not allowed.",
    line: 1,
  }],
});
