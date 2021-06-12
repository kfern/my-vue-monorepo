import { mount } from '@cypress/vue'
import Toggle from "@/Toggle/Toggle.vue";

const testProps = {
  msg : {
    inactive: 'Button text when inactive',
    active: 'Button text when active'
  }
};

describe("Toggle.vue", () => {
  it("renders inactive msg by default", () => {
    mount(Toggle, {
      props: testProps,
    });
    cy.get('button').contains(testProps.msg.inactive)
  });

});
