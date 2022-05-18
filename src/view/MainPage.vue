<template>
  <el-row justify="center" style="width: 100%; transform: translateY(60px)">
    <el-col :span="14">
      <el-card class="major" style="overflow: scroll; height: 92vh;">
        <template #header>
          <h1>专业介绍</h1>
          <p>目前该网站已经收录了6所高校智能财务专业的相关信息
            包括专业简介，培养目标，课程概览等</p>
        </template>
        <el-row justify="center">
          <el-col :span="20">
            <el-scrollbar max-height="675px" wrap-style="width: 95%">
              <el-timeline>
                <transition-group>
                  <el-timeline-item v-for="(school, i) in schoolTimeline"
                                    :key="i"
                                    :color="active[i] ? '#60A0F8' : ''"
                                    :size="active[i] ? 'large' : 'normal'"
                                    :timestamp="school.timestamp"
                                    center
                                    placement="top"
                                    @mouseout="mouseout(i)"
                                    @mouseover="mouseover(i)">
                    <el-card :shadow="active[i] ? 'always' : 'never'">
                      <template #header>
                        <h2><b :style="{color: active[i] ? '#709EF1' : '#000000'}">{{ school.name }}</b></h2>
                      </template>
                      {{ school.info }}
                    </el-card>
                  </el-timeline-item>
                </transition-group>
              </el-timeline>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MajorIntroducePage"
}
</script>

<script setup>
import {reactive} from "vue";

// 学校时间线信息
let schoolTimeline = reactive(
    [
      {
        name: '南京理工大学',
        timestamp: '2018年9月14日',
        info: '南京理工大学(Nanjing University of Science and Technology)，简称“南理工”，位于江苏省南京市，是隶属于工业和信息化部, 由工信部、教育部与江苏省人民政府共建的全国重点大学，是国家“双一流”建设高校'
      },
      {
        name: '浙江大学',
        timestamp: '2019年6月3日',
        info: '浙江大学(Zhejiang University)，简称“浙大”，位于浙江省杭州市，是中华人民共和国教育部直属的综合性全国重点大学，位列国家“双一流”'
      },
      {
        name: '南京审计大学',
        timestamp: '2019年9月2日',
        info: '南京审计大学(Nanjing Audit University)，简称“南审”，位于江苏省南京市，是中国审计高等教育发源地之一，是教育部、财政部、审计署和江苏省人民政府共建高校'
      },
      {
        name: '杭州电子科技大学',
        timestamp: '2020年9月1日',
        info: '杭州电子科技大学(Hangzhou Dianzi University)，简称“杭电”，位于杭州市，是浙江省人民政府与国防科技工业局共建高校， 是一所电子信息特色突出，经管学科优势明显，工、理、经、管、文、法、艺等多学科相互渗透的教学研究型大学'
      },
      {
        name: '山东财经大学',
        timestamp: '2021年1月16日',
        info: '山东财经大学(Shandong University of Finance and Economics)，位于山东省济南市， 是山东省人民政府与中华人民共和国财政部、中华人民共和国教育部共建高校'
      },
      {
        name: '广东财经大学',
        timestamp: '2021年10月27日',
        info: '广东财经大学(Guangdong University of Finance & Economics)是一所以经济学、管理学、法学为主体，文学、理学、工学、艺术学等多学科协同发展的广东省重点建设大学'
      }
    ]
)

let active = reactive(new Array(schoolTimeline.length).fill(false))

// 当鼠标在时间线上的单个卡片上激活
function mouseover(index) {
  active[index] = true;
}

function mouseout(index) {
  active[index] = false;
}

</script>
<style scoped>


</style>
