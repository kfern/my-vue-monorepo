import { shallowMount, mount } from "@vue/test-utils";
import Toggle from "@/Toggle/Toggle.vue";

describe("Toggle.vue", () => {
  it("renders props.inactiveMsg by default", () => {
    const testProps = {
      inactiveMsg: 'Click to activate',
      activeMsg: 'Active! Click to deactivate'
    }
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });
    expect(wrapper.text()).toMatch(testProps.inactiveMsg);
  });

  it("renders props.activeMsg When inactive and click", async () => {
    const testProps = {
      inactiveMsg: 'Click to activate',
      activeMsg: 'Active! Click to deactivate'
    }
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });

    // Act
    await wrapper.find('button').trigger('click');

    // Assert
    expect(wrapper.text()).toMatch(testProps.activeMsg);
  });

  it("renders props.inactiveMsg When active and click", async () => {
    const testProps = {
      inactiveMsg: 'Click to activate',
      activeMsg: 'Active! Click to deactivate'
    }
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });
    await wrapper.find('button').trigger('click'); // Go to active
    expect(wrapper.text()).toMatch(testProps.activeMsg); // check

    // Act. Go to active
    await wrapper.find('button').trigger('click');

    // Assert
    expect(wrapper.text()).toMatch(testProps.inactiveMsg);
  });  

  it("is stable", () => {
    const testProps = {
      inactiveMsg: 'Click to activate',
      activeMsg: 'Active! Click to deactivate'
    }
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
