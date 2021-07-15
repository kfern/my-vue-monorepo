import { mount } from "@cypress/vue";
import ToggleWithClose from "@/ToggleWithClose/ToggleWithClose.vue";

const testSelectors = {
  states: {
    inactive: ".inactive-screen",
    active: ".active-screen",
    closed: ".closed-screen",
  },
  events: {
    CLICK: ".click-button",
    CLOSE: ".close-button",
    OPEN: ".open-button",
  },
};

/*
import machine from "@/ToggleWithClose/ToggleWithClose.machine.json";
import { getTestsModels } from "../lib/test-utils";

const checkState = {
  inactive: (cy) => {
    cy.get(testSelectors.states.inactive);
  },active: (cy) => {
    cy.get(testSelectors.states.active);
  },closed: (cy) => {
    cy.get(testSelectors.states.closed);
  },
};

const triggerEvents = {
  click: (cy) => {
    cy.get(testSelectors.events.CLICK).click();
  },close: (cy) => {
    cy.get(testSelectors.events.CLOSE).click();
  },open: (cy) => {
    cy.get(testSelectors.events.OPEN).click();
  },
};

const testModel = getTestsModels(machine, checkState, triggerEvents);
const testPlans = testModel.getSimplePathPlans(); // getShortestPathPlans();
*/

describe("ToggleWithClose.vue", () => {
  const testProps = {
    inactive: "Text when inactive",
    active: "Text when active",
    closed: "Text when closed",
  };

  beforeEach(() => {
    // Arrange
    mount(ToggleWithClose, {
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
    // @todo: Go to inactive state before check
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

  it("renders 'closed' screen When 'active' and 'CLOSE'", () => {
    // Arrange:
    cy.get(testSelectors.events.CLICK).click();
    cy.get(testSelectors.states.active).contains(testProps.active); // Check

    // Act: Next state
    cy.get(testSelectors.events.CLOSE).click();

    // Assert
    cy.get(testSelectors.states.closed).contains(testProps.closed); // Check
  });

  it("renders 'active' screen When 'closed' and 'OPEN'", () => {
    // Arrange: starts inactive
    cy.get(testSelectors.events.CLICK).click();
    cy.get(testSelectors.events.CLOSE).click();
    cy.get(testSelectors.states.closed).contains(testProps.closed); // Check

    // Act: Next state
    cy.get(testSelectors.events.OPEN).click();

    // Assert
    cy.get(testSelectors.states.active).contains(testProps.active); // Check
  });
});
