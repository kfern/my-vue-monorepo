function noOp(el) {
  el;
}
if (typeof window.URL.createObjectURL === "undefined") {
  Object.defineProperty(window.URL, "createObjectURL", { value: noOp });
}

global.Plotly = require("plotly.js");
