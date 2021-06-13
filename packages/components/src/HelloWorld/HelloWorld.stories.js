import HelloWorld from "./HelloWorld.vue";

export default {
  title: "components/HelloWorld",
  component: HelloWorld,
  argTypes: {
    msg: "HelloWorld Story",
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { HelloWorld },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<hello-world v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  msg: "Hello StoryBook World",
};
