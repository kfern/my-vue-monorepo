---
inject: true
to: src/main.js
append: true
skip_if: <%= h.changeCase.pascalCase(name) %>
sh: cd <%= cwd %> && yarn lint src/main.js
---
export { default as <%= h.changeCase.pascalCase(name) %> } from './<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue';