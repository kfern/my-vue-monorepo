<template>
  <slot />
  <div ref="divPlot" class="divPlot"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getDemoData } from "../lib/dataProvider";

const layout = {
  title: "A financial chart",
  xaxis: {
    title: "Date",
  },
  yaxis: {
    title: "Price",
  },
};

export default defineComponent({
  name: "HelloDanfo",

  setup(/*props*/) {
    const divPlot = ref("");
    const showPlot = async () => {
      // Cargar los datos vía API
      const df = getDemoData();
      // Mostrar el gráfico
      df.plot(divPlot.value).line({
        columns: ["price"],
        layout: layout,
        displaylogo: false,
        modeBarButtonsToRemove: ["sendDataToCloud"],
      });
    };

    onMounted(showPlot); // Cargar los datos y mostrar el gráfico

    return {
      divPlot,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.divPlot {
  width: 90%;
}
</style>
