import { createMachine } from "xstate";
import { createModel } from "@xstate/test";
import { mount } from "@cypress/vue";
import Toggle from "@/Toggle/Toggle.vue";

const testSelectors = {
  states: {
    inactive: ".inactive-screen",
    active: ".active-screen",
  },
  events: {
    CLICK: ".click-button",
  },
};

const definition = {
  id: "toggleMachine",
  initial: "inactive",
  context: {},
  states: {
    inactive: {
      on: {
        CLICK: {
          target: "active",
        },
      },
      meta: {
        test: ({ cy, selectors }) => {
          cy.get(selectors.states.inactive);
        },
      },
    },
    active: {
      on: {
        CLICK: {
          target: "inactive",
        },
      },
      meta: {
        test: ({ cy, selectors }) => {
          cy.get(selectors.states.active);
        },
      },
    },
  },
};

const options = {};
const testMachine = createMachine(definition, options);
const testModel = createModel(testMachine).withEvents({
  CLICK: {
    exec: ({ cy, selectors }) => {
      cy.get(selectors.events.CLICK).click();
    },
  },
});

describe("Toggle", () => {
  const testProps = {
    inactive: "Text when inactive",
    active: "Text when active",
  };

  const testPlans = testModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          // do any setup, then...
          mount(Toggle, {
            props: testProps,
          });
          cy.waitUntil(() => path.test({ cy, selectors: testSelectors }));
        });
      });
    });
  });

  describe("Coverage", () => {
    it("should have full coverage", () => {
      return testModel.testCoverage();
    });
  });
});

/*
describe("testMachine", () => {
  it("initialState", () => {
    const expectedState = definition.initial; // the expected state value
    const actualState = testMachine.initialState.value;
    expect(actualState).toBe(expectedState);
  });
});
*/

/*
import { mount } from "@cypress/vue";
import Toggle from "@/Toggle/Toggle.vue";

import machine from "@/Toggle/Toggle.machine.json";
import { getTestsModels } from "../lib/test-utils";

const testSelectors = {
  states: {
    inactive: ".inactive-screen",
    active: ".active-screen",
  },
  events: {
    CLICK: ".click-button",
  },
};

/*
/*
const checkState = {
  inactive: (cy) => {
    cy.get(testSelectors.states.inactive);
  },active: (cy) => {
    cy.get(testSelectors.states.active);
  },
};

const triggerEvents = {
  click: (cy) => {
    cy.get(testSelectors.events.CLICK).click();
  },
};

const testModel = getTestsModels(machine, checkState, triggerEvents);
const testPlans = testModel.getSimplePathPlans(); // getShortestPathPlans();
*/

/*
describe("Toggle.vue", () => {
  const testProps = {
    inactive: "Text when inactive",
    active: "Text when active",
  };

  beforeEach(() => {
    // Arrange
    mount(Toggle, {
      props: testProps,
    });
  });

  it("renders inactive screen by default", () => {
    // Act: Nothing

    // Assert
    cy.get(testSelectors.states.inactive).contains(testProps.inactive);
  });

  it("renders "active" screen When "inactive" and "CLICK"", () => {
    // Arrange:
    cy.get(testSelectors.states.inactive).contains(testProps.inactive); // Check

    // Act: Next state
    cy.get(testSelectors.events.CLICK).click();

    // Assert
    cy.get(testSelectors.states.active).contains(testProps.active); // Check
  });

  it("renders "inactive" screen When "active" and "CLICK"", () => {
    // Arrange:
    cy.get(testSelectors.events.CLICK).click();
    cy.get(testSelectors.states.active).contains(testProps.active); // Check

    // Act: Next state
    cy.get(testSelectors.events.CLICK).click();

    // Assert
    cy.get(testSelectors.states.inactive).contains(testProps.inactive); // Check
  });
});
*/
