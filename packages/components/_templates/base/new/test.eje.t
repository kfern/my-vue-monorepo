---
to: src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.spec.js
sh: cd <%= cwd %> && yarn lint src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.spec.js
---
import { getTestsModels } from "../lib/test-utils";
import { mount } from "@cypress/vue";
import <%= h.changeCase.pascalCase(name) %> from "@/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue";
import machineJSON from "@/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.machine.json";

const now = new Date().toLocaleString();

const testProps = {
  <% for(const state of statesNames) {%><%= state %>: "Text when <%= state %> " + now,<% } %>
};

const testSelectors = {
  states: {<% for(const state of statesNames) {%> 
    <%= state %>: {
      class: ".<%= state %>-screen", value: testProps.<%= state %>
    },<% } %>
  },
  events: {<% for(const event of eventsNames) {%>
    <%= event %>: ".<%= h.changeCase.lower(event) %>-button",<% } %>
  }
};

const triggerEvents = {<% for(const event of eventsNames) {%>
  <%= event %>: {
    exec: ({ cy, selectors }) => {
      cy.get(selectors.events.<%= event %>).click();
    },
  },<% } %>
}

const checkState = {<% for(const state of statesNames) {%>
  <%= state %>: ({ cy, selectors }) => {
    cy.get(selectors.states.<%= state %>.class).contains(
      selectors.states.<%= state %>.value
    );
  },<% } %>
};

const testModel = getTestsModels(machineJSON, checkState, triggerEvents);

describe("<%= h.changeCase.pascalCase(name) %>", () => {
  const testPlans = testModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          // do any setup, then...
          mount(<%= h.changeCase.pascalCase(name) %>, {
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
