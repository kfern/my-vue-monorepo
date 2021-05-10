import { shallowMount, mount } from "@vue/test-utils";
import HelloWorld from "@/HelloWorld/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it("is stable", () => {
    const msg = "Component is stable";
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
