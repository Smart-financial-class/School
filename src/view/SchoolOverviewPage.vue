<template>
  <el-row :gutter="20" justify="center" style="width: 65%;">
    <el-col :span="18">
      <el-card style="height: 100%">
        <el-scrollbar v-if="schools.length !== 0" max-height="800px">
          <el-row justify="center" style="margin-top: 20px;">
            <el-col v-for="school in schools" :key="school.UniId" :span="20">
              <school-info :courses="school.information.map(value => value.courseName)"
                           :name="school.UniName"
                           :type="school.type"
                           style="margin: 10px 0"
              />
            </el-col>
          </el-row>
        </el-scrollbar>
        <h2 v-else style="text-align: center">该页面展示开设了<b>智能财务</b>专业的高校的相关信息</h2>
        <el-alert v-show="alert"
                  :center="true"
                  class="alert"
                  title="暂无学校信息"
                  type="error"
                  @close="alert = false"/>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-space :size="20" direction="vertical" fill>
        <el-card class="choice" header="高校类别">
          <el-checkbox-group v-model="categoriesActive">
            <el-checkbox v-for="(category, i) in categories" :key="i" :label="category" style="display: block">
              {{ category }}
            </el-checkbox>
          </el-checkbox-group>
        </el-card>
        <el-card class="choice" header="课程">
          <el-checkbox-group disabled>
            <el-checkbox :label="0">综合类学校</el-checkbox>
            <el-checkbox :label="1">理工类学校</el-checkbox>
            <el-checkbox :label="2">经管类学校</el-checkbox>
          </el-checkbox-group>
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SchoolOverview"
}
</script>

<script setup>
import {ref, computed, watch, onMounted} from "vue";
import {useStore} from 'vuex';
import testData from '@/assets/test-data.json'
import SchoolInfo from "@/components/SchoolOverview/SchoolInfo";


let store = useStore();
// 全部学校信息
let schoolInfos = computed(() => store.state.schools);
// 学校类别
let categories = computed(() => [...new Set(schoolInfos.value.map(value => value.type))]);
// 按学校类别分类的学校信息
let schools = computed(() => {
  return schoolInfos.value.filter(value => categoriesActive.value.includes(value.type));
});
// 选择了的学校类别
let categoriesActive = ref(categories.value);

let alert = ref(false);


watch(categoriesActive, () => {
  if (schoolInfos.value.length === 0) {
    alert.value = true;
  }
});
// 挂载时异步获取学校信息
onMounted(() => {
  store.commit('FETCH_SCHOOL_INFO', testData);
});
</script>

<style scoped>
.choice {
  max-height: 50%;
}

.alert {
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 10;
}
</style>
