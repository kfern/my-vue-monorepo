<!-- Toggle.vue -->
<template>
  <button @click="send('TOGGLE')">
    {{
      state.value === 'inactive'
        ? inactiveMsg
        : activeMsg
    }}
  </button>
</template>

<script>

import { useMachine } from '@xstate/vue';
import { createMachine } from 'xstate';

// This machine is completely decoupled from Vue
const toggleMachine = createMachine({
  id: "toggle",
  context: {
    /* some data */
  },
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
});

export default {
  name: 'Toogle',
  props: {
    activeMsg: String,
    inactiveMsg: String
  },
  setup() {
    const { state, send } = useMachine(toggleMachine);
    return {
      state,
      send
    };
  }
};

</script>
