---
to: src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.spec.js
sh: cd <%= cwd %> && yarn lint src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.spec.js
---
import { mount } from "@cypress/vue";
import <%= h.changeCase.pascalCase(name) %> from "@/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue";

const testSelectors = {
  states: {<% for(const state of statesNames) {%> 
    <%= state %>: ".<%= state %>-screen",<% } %>
  },
  events: {<% for(const event of eventsNames) {%>
    <%= event %>: ".<%= h.changeCase.lower(event) %>-button",<% } %>
  }
};

/*
import machine from "@/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.machine.json";
import { getTestsModels } from "../lib/test-utils";

const checkState = {
  <% for(const state of statesNames) {%><%= state %>: (cy) => {
    cy.get(testSelectors.states.<%= state %>);
  },<% } %>
};

const triggerEvents = {
  <% for(const event of eventsNames) {%><%= h.changeCase.lower(event) %>: (cy) => {
    cy.get(testSelectors.events.<%= event %>).click();
  },<% } %>
};

const testModel = getTestsModels(machine, checkState, triggerEvents);
const testPlans = testModel.getSimplePathPlans(); // getShortestPathPlans();
*/

describe("<%= h.changeCase.pascalCase(name) %>.vue", () => {

  const testProps = {
    <% for(const state of statesNames) {%><%= state %>: "Text when <%= state %>",<% } %>
  };

  beforeEach(() => {
    // Arrange
    mount(<%= h.changeCase.pascalCase(name) %>, {
      props: testProps,
    });
  });

  it("renders <%= statesNames[0] %> screen by default", () => {

    // Act: Nothing

    // Assert
    cy.get(testSelectors.states.<%= statesNames[0] %>).contains(testProps.<%= statesNames[0] %>);
  });

  <% for(const n of transitions) {%>
    <% for(const t of n.events) {%>
  it("renders '<%= t.target %>' screen When '<%= t.state %>' and '<%= t.event %>'", () => {
    // Arrange: 
    // @todo: Go to <%= t.state %> state before check
    cy.get(testSelectors.states.<%= t.state %>).contains(testProps.<%= t.state %>); // Check

    // Act: Next state
    cy.get(testSelectors.events.<%= t.event %>).click();

    // Assert
    cy.get(testSelectors.states.<%= t.target %>).contains(testProps.<%= t.target %>); // Check
  });

    <% } %>        
  <% } %>


});
