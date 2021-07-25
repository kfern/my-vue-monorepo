// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
// https://github.com/jondot/hygen/issues/35#issue-304929297

const { getInputs } = require('../../../lib/inputs.utils');

module.exports = {
  prompt: ({ inquirer, args }) => {
    return getInputs(inquirer, args)
  },
};
