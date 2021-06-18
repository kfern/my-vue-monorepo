---
to: src/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.machine.json

---
<%- JSON.stringify(machine,null,'\t') %>
