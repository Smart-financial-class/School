import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Particles from "particles.vue3";
import "element-plus/dist/index.css";
import ECharts from "vue-echarts";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(Particles);
app.use(createPinia());
app.component("v-chart", ECharts);
app.mount("#app");
