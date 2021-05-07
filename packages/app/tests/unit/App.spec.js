import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("is stable", () => {
    const wrapper = mount(App);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
