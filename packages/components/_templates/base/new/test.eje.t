---
to: src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.spec.js
---
import { mount } from "@cypress/vue";
import <%= h.changeCase.pascalCase(name) %> from "@/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue";

describe("<%= h.changeCase.pascalCase(name) %>.vue", () => {
  it("renders props.msg when passed", () => {
    // Arrange
    const testProps = {
      msg: "new message",
    };
    mount(<%= h.changeCase.pascalCase(name) %>, {
      props: testProps,
    });

    // Act: Nothing

    // Assert
    cy.get(".<%= h.changeCase.pascalCase(name) %>").contains(testProps.msg);
  });
});
