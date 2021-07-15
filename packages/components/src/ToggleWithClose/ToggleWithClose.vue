<!-- ToggleWithClose.vue -->

<template>
  <div v-bind:data-state="state.value" class="toggle-with-close-component">
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
      <button class="close-button" @click="send('CLOSE')">
        active + CLOSE -> closed
      </button>
    </div>
    <div v-if="state.value === 'closed'" :class="`${state.value}-screen`">
      <p>{{ closed }}</p>
      <button class="open-button" @click="send('OPEN')">
        closed + OPEN -> active
      </button>
    </div>
  </div>
</template>

<script>
// Jest throw an error when import. It works with require
// import { useMachine } from '@xstate/vue';

const { useMachine } = require("@xstate/vue");
import { createMachine } from "xstate";
import machine from "./ToggleWithClose.machine.json";

export default {
  name: "ToggleWithClose",
  props: {
    inactive: String,
    active: String,
    closed: String,
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
.closed-screen {
  width: 90%;
}
.click-button {
  width: 20%;
  margin: 1em;
}
.close-button {
  width: 20%;
  margin: 1em;
}
.open-button {
  width: 20%;
  margin: 1em;
}
</style>
