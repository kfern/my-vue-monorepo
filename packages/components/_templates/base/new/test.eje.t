---
to: tests/unit/<%= h.changeCase.pascalCase(name) %>.spec.js
---
import { shallowMount, mount } from "@vue/test-utils";
import <%= h.changeCase.pascalCase(name) %> from "@/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue";

describe("<%= h.changeCase.pascalCase(name) %>.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(<%= h.changeCase.pascalCase(name) %>, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  // Change xit by it when stable
  xit("is stable", () => {
    const msg = "<%= h.changeCase.pascalCase(name) %> is stable";
    const wrapper = mount(<%= h.changeCase.pascalCase(name) %>, {
      props: { msg },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
