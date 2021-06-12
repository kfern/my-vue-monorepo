import { shallowMount, mount } from "@vue/test-utils";
import Toggle from "@/Toggle/Toggle.vue";

xdescribe("Toggle.vue", () => {
  it("renders props.inactiveMsg by default", () => {
    const testProps = {
      inactiveMsg: 'Click to activate',
      activeMsg: 'Active! Click to deactivate'
    }
    const wrapper = shallowMount(Toggle, {
      props: testProps,
    });
    expect(wrapper.text()).toMatch(testProps.activeMsg);
  });

  // Change xit by it when stable
  xit("is stable", () => {
    const msg = "Toggle is stable";
    const wrapper = mount(Toggle, {
      props: { msg },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
