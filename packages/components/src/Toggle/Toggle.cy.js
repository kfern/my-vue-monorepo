import { getTestsModels } from "../lib/test-utils";
import { mount } from "@cypress/vue";
import Toggle from "@/Toggle/Toggle.vue";
import machineJSON from "@/Toggle/Toggle.machine.json";

const now = new Date().toLocaleString();

const testProps = {
  inactive: "Text when inactive " + now,
  active: "Text when active " + now,
};

const testSelectors = {
  states: {
    inactive: {
      class: ".inactive-screen",
      value: testProps.inactive,
    },
    active: {
      class: ".active-screen",
      value: testProps.active,
    },
  },
  events: {
    CLICK: ".click-button",
  },
};

const triggerEvents = {
  CLICK: {
    exec: ({ cy, selectors }) => {
      cy.get(selectors.events.CLICK).click();
    },
  },
};

const checkState = {
  inactive: ({ cy, selectors }) => {
    cy.get(selectors.states.inactive.class).contains(
      selectors.states.inactive.value
    );
  },
  active: ({ cy, selectors }) => {
    cy.get(selectors.states.active.class).contains(
      selectors.states.active.value
    );
  },
};

const testModel = getTestsModels(machineJSON, checkState, triggerEvents);

describe("Toggle", () => {
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
