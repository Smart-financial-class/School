<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-scrollbar v-if="schools.length !== 0" max-height="780px">
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
    </el-col>
    <el-col :span="6">
      <el-space :size="20" direction="vertical" fill>
        <el-card class="choice" header="高校类别" shadow="never">
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
        <el-card class="choice" header="课程" shadow="never">
          <el-input v-model="searchInput" placeholder="搜索课程"/>
          <el-divider/>
          <el-checkbox-group v-model="activeCourses">
            <el-scrollbar max-height="350px">
              <el-checkbox v-for="(course, i) in courses" :key="i + course" :label="course"
                           style="display: block; margin: 0;">
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
let schools = computed(() => {
  return store.state.School.schools.filter(value => {
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
/* 课程信息 */
let searchInput = ref('');
let activeCourses = ref([]);
let courses = computed(() => {
  return store.getters["School/courses"].filter(value => value.includes(searchInput.value));
})


/* 实现学校类别的选择 */
let cateSelectAll = ref(false);
let categories = computed(() => store.getters["School/schoolCategory"]);
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
  store.commit('School/FETCH_SCHOOL_INFO', testData);
});
</script>

<style scoped>
.choice {
  min-width: 33%;
}
</style>
