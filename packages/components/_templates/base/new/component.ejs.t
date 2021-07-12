---
to: src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue
sh: cd <%= cwd %> && yarn lint src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue
---
<!-- <%= h.changeCase.pascalCase(name) %>.vue -->

<template>
  <% for(const t of transitions) {%>
  <div v-if="state.value === '<%= t.state %>'" :class="`${state.value}-screen`">
    <button class="click-button" @click="send('<%= t.event %>')">
      {{ <%= t.state %> }}
    </button>
  </div>
  <% } %>
</template>

<script>

// Jest throw an error when import. It works with require
// import { useMachine } from '@xstate/vue'; 

const { useMachine } = require("@xstate/vue");
import { createMachine } from "xstate";
import machine from "./<%= h.changeCase.pascalCase(name) %>.machine.json";

export default {
  name: "<%= h.changeCase.pascalCase(name) %>",
  props: {
    <% for(const state of statesNames) {%> <%= state %>: String,<% } %>
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
<% for(const state of statesNames) {%> .<%= state %>-screen {
  width: 90%
}<% } %>
<% for(const event of eventsNames) {%> .<%= h.changeCase.lower(event) %>-button {
  width: 20%
}<% } %>
</style>
