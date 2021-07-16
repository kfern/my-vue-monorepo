const { Machine } = require("xstate");
const { createModel } = require("@xstate/test");

// @from: https://timdeschryver.dev/blog/generated-tests-with-xstate-and-cypress#configuring-the-states-for-cypress
const addTests = (machineDefinition, tests) => {
  return {
    ...machineDefinition,
    states: Object.entries(machineDefinition.states).reduce(
      (s, [stateKey, stateValue]) => {
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
      },
      {}
    ),
  };
};

export const getTestsModels = (
  machineDefinition,
  checkState,
  triggerEvents
) => {
  const testMachine = Machine(addTests(machineDefinition, checkState));
  const testModel = createModel(testMachine).withEvents(triggerEvents);
  return testModel;
};
