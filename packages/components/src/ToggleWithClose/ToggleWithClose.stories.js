import ToggleWithClose from "./ToggleWithClose.vue";

export default {
  title: "components/ToggleWithClose",
  component: ToggleWithClose,
  argTypes: {
    inactive: String,
    active: String,
    closed: String,
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ToggleWithClose },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<toggle-with-close v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  inactive: "Text when inactive state",
  active: "Text when active state",
  closed: "Text when closed state",
};
