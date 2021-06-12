import { shallowMount, mount } from "@vue/test-utils";
import Toggle from "@/Toggle/Toggle.vue";

const testProps = {
  msg : {
    inactive: 'Button text when inactive',
    active: 'Button text when active'
  }
};

describe("Toggle.vue", () => {
  it("renders inactive msg by default", () => {
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });
    expect(wrapper.text()).toMatch(testProps.msg.inactive);
  });

  it("renders active msg When inactive and click", async () => {
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });

    // Act
    await wrapper.find('button').trigger('click');

    // Assert
    expect(wrapper.text()).toMatch(testProps.msg.active);
  });

  it("renders inactive msg When active and click", async () => {
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });
    await wrapper.find('button').trigger('click'); // Go to active
    expect(wrapper.text()).toMatch(testProps.msg.active); // check

    // Act. Go to active
    await wrapper.find('button').trigger('click');

    // Assert
    expect(wrapper.text()).toMatch(testProps.msg.inactive);
  });  

  it("is stable", () => {
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
