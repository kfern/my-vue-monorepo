<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Vue 3 + TypeScript + Danfo.js" />
  <HelloDanfo>
    <ul>
      <li>
        <a href="https://danfo.jsdata.org/" target="_BLANK"
          >Danfo.js Documentation</a
        >
      </li>
    </ul>
  </HelloDanfo>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloDanfo from "./components/HelloDanfo.vue";
import { HelloWorld } from "@kfern/my_components";

export default defineComponent({
  name: "App",
  components: {
    HelloDanfo,
    HelloWorld,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  width: 90%;
}
</style>
