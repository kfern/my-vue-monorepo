---
to: src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.stories.js
sh: cd <%= cwd %> && yarn lint src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.stories.js

---
import <%= h.changeCase.pascalCase(name) %> from "./<%= h.changeCase.pascalCase(name) %>.vue";

export default {
  title: "components/<%= h.changeCase.pascalCase(name) %>",
  component: <%= h.changeCase.pascalCase(name) %>,
  argTypes: {
    <% for(const state of statesNames) {%> <%= state %>: String,<% } %>
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { <%= h.changeCase.pascalCase(name) %> },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<<%= h.changeCase.paramCase(name) %> v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  <% for(const state of statesNames) {%> <%= state %>: "Text when <%= state %> state",<% } %>
};
