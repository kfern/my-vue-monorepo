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

/*
import machine from "@/Toggle/Toggle.machine.json";
import { getTestsModels } from "../lib/test-utils";

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

  it("renders 'active' screen When 'inactive' and 'CLICK'", () => {
    // Arrange:
    cy.get(testSelectors.states.inactive).contains(testProps.inactive); // Check

    // Act: Next state
    cy.get(testSelectors.events.CLICK).click();

    // Assert
    cy.get(testSelectors.states.active).contains(testProps.active); // Check
  });

  it("renders 'inactive' screen When 'active' and 'CLICK'", () => {
    // Arrange:
    cy.get(testSelectors.events.CLICK).click();
    cy.get(testSelectors.states.active).contains(testProps.active); // Check

    // Act: Next state
    cy.get(testSelectors.events.CLICK).click();

    // Assert
    cy.get(testSelectors.states.inactive).contains(testProps.inactive); // Check
  });
});
