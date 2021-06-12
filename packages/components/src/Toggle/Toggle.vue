<!-- Toggle.vue -->
<template>
  <button @click="send('TOGGLE')">
    {{ msg[state.value] }}
  </button>
</template>

<script>
// import { useMachine } from '@xstate/vue'; // With this syntax jest throw an error
const { useMachine } = require("@xstate/vue");
import { createMachine } from "xstate";

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
  name: "Toogle",
  props: {
    msg: {
      active: String,
      inactive: String,
    },
  },
  setup() {
    const { state, send } = useMachine(toggleMachine);
    return {
      state,
      send,
    };
  },
};
</script>
