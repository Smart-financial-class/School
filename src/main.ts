import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import ElementPlus from "element-plus";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Particles from "particles.vue3";
import "element-plus/dist/index.css";
import ECharts from "vue-echarts";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Particles);
app.component("v-chart", ECharts);
app.mount("#app");
