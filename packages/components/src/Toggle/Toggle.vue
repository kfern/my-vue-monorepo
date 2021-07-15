<!-- Toggle.vue -->

<template>
  <div v-bind:data-state="state.value" class="toggle-component">
    <div v-if="state.value === 'inactive'" :class="`${state.value}-screen`">
      <p>{{ inactive }}</p>
      <button class="click-button" @click="send('CLICK')">
        inactive + CLICK -> active
      </button>
    </div>
    <div v-if="state.value === 'active'" :class="`${state.value}-screen`">
      <p>{{ active }}</p>
      <button class="click-button" @click="send('CLICK')">
        active + CLICK -> inactive
      </button>
    </div>
  </div>
</template>

<script>
// Jest throw an error when import. It works with require
// import { useMachine } from '@xstate/vue';

const { useMachine } = require("@xstate/vue");
import { createMachine } from "xstate";
import machine from "./Toggle.machine.json";

export default {
  name: "Toggle",
  props: {
    inactive: String,
    active: String,
  },
  setup() {
    const { state, send } = useMachine(createMachine(machine));
    return {
      state,
      send,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inactive-screen {
  width: 90%;
}
.active-screen {
  width: 90%;
}
.click-button {
  width: 20%;
  margin: 1em;
}
</style>
