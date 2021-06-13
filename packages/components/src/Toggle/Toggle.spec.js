import { mount } from "@cypress/vue";
import Toggle from "@/Toggle/Toggle.vue";

const testProps = {
  msg: {
    inactive: "Button text when inactive",
    active: "Button text when active",
  },
};

describe("Toggle.vue", () => {
  it("renders inactive msg by default", () => {
    // Arrange
    mount(Toggle, {
      props: testProps,
    });

    // Act: Nothing

    // Assert
    cy.get("button").contains(testProps.msg.inactive);
  });

  it("renders active msg When inactive and click", () => {
    // Arrange
    mount(Toggle, {
      props: testProps,
    });
    cy.get("button").contains(testProps.msg.inactive);

    // Act
    cy.get("button").click();

    // Assert
    cy.get("button").contains(testProps.msg.active);
  });

  it("renders inactive msg When active and click", () => {
    mount(Toggle, {
      props: testProps,
    });
    cy.get("button").click(); // Go to active
    cy.get("button").contains(testProps.msg.active); // Check

    // Act. Go to inactive
    cy.get("button").click();

    // Assert
    cy.get("button").contains(testProps.msg.inactive);
  });
});
