const { createPlugin, utils } = require("stylelint");

const ruleName = "plugin/at-extend-disallowed-list";

const messages = utils.ruleMessages(ruleName, {
  rejected: (name) => `Unexpected at-extend "${name}"`,
});

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

module.exports = createPlugin(ruleName, (primaryOption) => {
  const disallowedSelectors = [].concat(primaryOption);

  return (postcssRoot, postcssResult) => {
    const validOptions = utils.validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: [isString],
    });

    if (!validOptions) {
      return;
    }

    postcssRoot.walkAtRules("extend", (atRule) => {
      const selector = atRule.params;

      if (disallowedSelectors.includes(selector)) {
        utils.report({
          ruleName,
          result: postcssResult,
          node: atRule,
          message: messages.rejected,
          messageArgs: [selector],
        });
      }
    })
  }
});

module.exports.primaryOptionArray = true;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
