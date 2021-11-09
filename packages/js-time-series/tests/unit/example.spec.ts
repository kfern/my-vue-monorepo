import { shallowMount } from "@vue/test-utils";
import HelloDanfo from "../../src/components/HelloDanfo.vue";

describe("HelloDanfo.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloDanfo, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
