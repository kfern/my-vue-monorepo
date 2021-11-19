import { shallowMount } from "@vue/test-utils";
import HelloDanfo from "../../src/components/HelloDanfo.vue";

describe("HelloDanfo.vue", () => {
  it("renders plotly chart", async () => {
    const wrapper = shallowMount(HelloDanfo);
    expect(wrapper.findAll('[component-id="HelloDanfo"] > div.plotly').length).toBe(1);
  });
});
