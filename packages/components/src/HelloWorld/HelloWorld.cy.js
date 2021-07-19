import { mount } from "@cypress/vue";
import HelloWorld from "@/HelloWorld/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    // Arrange
    const testProps = {
      msg: "new message",
    };
    mount(HelloWorld, {
      props: testProps,
    });

    // Act: Nothing

    // Assert
    cy.get(".HelloWorld").contains(testProps.msg);
  });
});
