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
                           :activeCourses="activeCourses"
                           style="margin: 10px 0"
              />
            </el-col>
          </el-row>
        </el-scrollbar>
        <h2 v-else style="text-align: center">该页面展示开设了<b>智能财务</b>专业的高校的相关信息</h2>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-space :size="20" direction="vertical" fill>
        <el-card class="choice" header="高校类别">
          <el-checkbox v-model="cateSelectAll" :indeterminate="isIndeterminate" label="all" style="margin-bottom: 8px;"
                       @change="handleCateSelectAllChange">
            全选
          </el-checkbox>
          <el-checkbox-group v-model="activeCate" @change="handleCateActiveChange">
            <el-checkbox v-for="(category, i) in categories" :key="i + category" :label="category"
                         style="display: block">
              {{ category }}
            </el-checkbox>
          </el-checkbox-group>
        </el-card>
        <el-card class="choice" header="课程">
          <el-checkbox-group v-model="activeCourses">
            <el-scrollbar max-height="500px">
              <el-checkbox v-for="(course, i) in courseInfo" :key="i + course" :label="course" style="display: block">
                {{ course }}
              </el-checkbox>
            </el-scrollbar>
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
import {ref, computed, onBeforeMount} from "vue";
import {useStore} from 'vuex';
import testData from '@/assets/test-data.json'
import SchoolInfo from "@/components/SchoolOverview/SchoolInfo";

/* store */
let store = useStore();
/* 学校相关信息 */
let schoolInfos = computed(() => store.state.schools);
let schools = computed(() => {
  return schoolInfos.value.filter(value => {
    // 过滤符合类别的
    let cate = activeCate.value.includes(value.type);
    // 过滤含有目标课程的
    let cnt = 0;
    let course = value.information.map(val => val.courseName);
    activeCourses.value.forEach(val => {
      if (course.includes(val)) cnt++;
    })
    return cnt === activeCourses.value.length && cate;
  });
});
/* 全部课程信息 */
let activeCourses = ref([]);
let courseInfo = computed(() => store.getters.courses);


/* 实现学校类别的选择 */
let cateSelectAll = ref(false);
let categories = computed(() => store.getters.schoolCategory);
let activeCate = ref([]);
let isIndeterminate = ref(false);

function handleCateSelectAllChange(value) {
  activeCate.value = value ? categories.value : [];
  isIndeterminate.value = false
}

function handleCateActiveChange(value) {
  cateSelectAll.value = value.length === categories.value.length;
  isIndeterminate.value = value.length > 0 && value.length < categories.value.length;
}


// 挂载时异步获取学校信息
onBeforeMount(() => {
  store.commit('FETCH_SCHOOL_INFO', testData);
});
</script>

<style scoped>
.choice {
  max-height: 50%;
}
</style>
