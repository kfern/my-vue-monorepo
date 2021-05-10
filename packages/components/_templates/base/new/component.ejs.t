---
to: src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue
---
<template>
  <div class="<%= h.changeCase.pascalCase(name) %>">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener" >vue-cli documentation</a
      >.
    </p>
  </div>
</template>

<script>
export default {
  name: "<%= h.changeCase.pascalCase(name) %>",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
