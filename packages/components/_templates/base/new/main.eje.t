---
inject: true
to: src/main.js
append: true
skip_if: <%= h.changeCase.pascalCase(name) %>
---
export { default as <%= h.changeCase.pascalCase(name) %> } from './<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue';