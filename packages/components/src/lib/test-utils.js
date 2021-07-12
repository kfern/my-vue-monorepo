const { Machine } = require("xstate");
const { createModel } = require("@xstate/test");

const addTests = (state, tests) => {
  return {
    ...state,
    states: Object.entries(state.states).reduce((s, [stateKey, stateValue]) => {
      return {
        ...s,
        [stateKey]: {
          ...stateValue,
          meta: {
            ...stateValue.meta,
            test: tests[stateKey],
          },
        },
      };
    }, {}),
  };
};

export const getTestsModels = (machine, checkState, triggerEvents) => {
  const testMachine = Machine(addTests(machine, checkState));
  const testModel = createModel(testMachine).withEvents(triggerEvents);
  return testModel;
};
