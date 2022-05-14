<template>
  <el-scrollbar class="container" height="800px">
    <el-row justify="center" style="width: 100%;">
      <el-col :span="20">
        <el-card v-for="(option, i) in options" :key="i" class="chart-card" shadow="hover" @click="handleChartClick(i)">
          <v-chart :option="option" autoresize class="chart"/>
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>
  <el-dialog v-model="isDialogOpen" center destroy-on-close top="10vh" width="60%">
    <el-scrollbar height="600">
      <el-row justify="center">
        <v-chart :option="options[selectedChart]" autoresize class="dialog-chart"/>
      </el-row>
      <div>分析结果: {{ AnalysisResult[selectedChart].res }}</div>
      <div>可能原因: {{ AnalysisResult[selectedChart].reason }}</div>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
export default {
  name: "ChartsPage"
}
</script>

<script setup>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart, PieChart} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import {ref} from "vue";

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const options = [
  {
    title: {
      text: "每年开设智能财务专业的数量",
      left: "center"
    },
    xAxis: {
      type: 'category',
      data: [2018, 2019, 2020, 2021]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [9, 18, 21, 33],
        type: 'line'
      }
    ],
    tooltip: {
      formatter: "{b}年: {c}所"
    }
  },
  {
    title: {
      text: '2021年开设智能财务院校类别',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ['综合性大学', '财经类大学', '理工科大学', '师范类大学']
    },
    series: [
      {
        name: '大学属类',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 14, name: '综合性大学'},
          {value: 9, name: '财经类大学'},
          {value: 6, name: '理工科大学'},
          {value: 2, name: '师范类大学'},
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
];
const AnalysisResult = [
  {
    res: '开展智能财务专业高校课程的学校逐年增加',
    reason: '智能财务适应疫情之下的社会需求'
  },
  {
    res: '开展智能财务的高校中，综合类高校占比较高',
    reason: '智能财务设计财务方面的知识以及计算机方面的知识，综合类高校开展该专业有着天然的优势'
  }
]

let isDialogOpen = ref(false);
let selectedChart = ref(-1);

function handleChartClick(selectedChartIndex) {
  isDialogOpen.value = true;
  selectedChart.value = selectedChartIndex;
}

</script>

<style scoped>
.container {
  width: 100%;
}

.chart {
  height: 500px;
}

.dialog-chart {
  height: 600px;
}

.chart-card {
  margin: 40px 0;
  cursor: pointer;
}
</style>
