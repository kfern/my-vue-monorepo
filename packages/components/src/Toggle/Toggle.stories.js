import Toggle from './Toggle.vue';

export default {
  title: 'components/Toggle',
  component: Toggle,
  argTypes: {
    msg: {
      active: String,
      inactive: String
    }
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Toggle },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<toggle v-bind="args" />',
});

export const Example = Template.bind({});

Example.args = {
  msg : {
    inactive: 'Click to activate',
    active: 'Active! Click to deactivate'
  }
};
