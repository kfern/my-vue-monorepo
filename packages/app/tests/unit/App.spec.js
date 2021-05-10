import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("is stable", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
