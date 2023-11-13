"use strict";

// eslint-disable-next-line n/no-unpublished-require
const { getTestRule } = require("jest-preset-stylelint");

global.testRule = getTestRule({ plugins: ["./index.js"] });
