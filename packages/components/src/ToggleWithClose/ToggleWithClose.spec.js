import { getTestsModels } from "../lib/test-utils";
import { mount } from "@cypress/vue";
import ToggleWithClose from "@/ToggleWithClose/ToggleWithClose.vue";
import machineJSON from "@/ToggleWithClose/ToggleWithClose.machine.json";

const now = new Date().toLocaleString();

const testProps = {
  inactive: "Text when inactive " + now,
  active: "Text when active " + now,
  closed: "Text when closed " + now,
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
    closed: {
      class: ".closed-screen",
      value: testProps.closed,
    },
  },
  events: {
    CLICK: ".click-button",
    CLOSE: ".close-button",
    OPEN: ".open-button",
  },
};

const triggerEvents = {
  CLICK: {
    exec: ({ cy, selectors }) => {
      cy.get(selectors.events.CLICK).click();
    },
  },
  CLOSE: {
    exec: ({ cy, selectors }) => {
      cy.get(selectors.events.CLOSE).click();
    },
  },
  OPEN: {
    exec: ({ cy, selectors }) => {
      cy.get(selectors.events.OPEN).click();
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
  closed: ({ cy, selectors }) => {
    cy.get(selectors.states.closed.class).contains(
      selectors.states.closed.value
    );
  },
};

const testModel = getTestsModels(machineJSON, checkState, triggerEvents);

describe("ToggleWithClose", () => {
  const testPlans = testModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          // do any setup, then...
          mount(ToggleWithClose, {
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
