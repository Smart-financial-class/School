import {createApp} from 'vue'

import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import ElementPlus from 'element-plus'
import Particles from "particles.vue3";
import 'element-plus/dist/index.css';
import ECharts from 'vue-echarts'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Particles);
app.component('v-chart', ECharts);
app.mount('#app');
