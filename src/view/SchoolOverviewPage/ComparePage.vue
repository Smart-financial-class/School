<template>
  <h1 style="text-align: center">在这个页面,你可以进行高校间开展课程的对比</h1>
  <el-divider/>
  <div style="display:flex; justify-content: center; align-items: center; flex-direction: column; height: 600px">
    <el-transfer v-model="selectedSchoolId" :data="schoolNames" :titles="['待比较高校', '需比较高校']" filter-placeholder="搜索学校"
                 filterable/>
    <div class="buttons">
      <el-button :disabled="selectedSchoolId.length === 0" plain type="primary" @click="isDialogOpen = true">
        按课程开展种类对比
      </el-button>
      <!--      <el-button disabled plain type="primary" @click="isDialogOpen = true">-->
      <!--        按课程开展时间对比-->
      <!--      </el-button>-->
    </div>
  </div>
  <el-dialog v-model="isDialogOpen" :show-close="false" center width="60%">
    <template #title>
      <el-input v-model="courseSearchStr" placeholder="搜索课程"/>
    </template>
    <el-table :data="selectedTableData" height="500px" stripe>
      <el-table-column fixed label="课程" prop="course" width="150px">
        <template #default="scope">
          <span>{{ scope.row.course }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="(school, i) in selectedSchool"
                       :key="school.UniId"
                       :prop="school.UniName"
                       label="school.UniName"
                       min-width="120px">
        <template #header>
          <div class="table-header" @mouseout="tableColumnHover[i] = false" @mouseover="tableColumnHover[i] = true">
            <span>{{ school.UniName }}</span>
            <circle-close-filled v-show="tableColumnHover[i]" @click="removeTargetColumn(i)"/>
          </div>
        </template>
        <template #default="scope">
          <circle-check-filled v-show="scope.row[school.UniName]" color="#5A9CF8" width="20px"/>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

</template>

<script>
export default {
  name: "ComparePage"
}
</script>

<script setup>
import {useStore} from 'vuex';
import {computed, reactive, ref, watch} from "vue";
import {CircleCloseFilled, CircleCheckFilled} from "@element-plus/icons-vue";

let store = useStore();

let schoolNames = computed(() => {
  return store.getters["School/schoolNames"];
});

let schools = computed(() => store.state.School.schools);

let selectedSchoolId = ref([]);

let selectedSchool = computed(() => {
  return schools.value.filter(val => selectedSchoolId.value.indexOf(val.UniId) !== -1);
});

let isDialogOpen = ref(false);

let courses = computed(() => store.getters["School/courses"]);

let tableData = [];

function isHadCourse(school, courseName) {
  return school.information.filter(value => value.courseName === courseName).length !== 0;
}

let courseSearchStr = ref('');
let selectedTableData = computed(() => {
  console.log(tableData.filter(value => !courseSearchStr.value || value.course.includes(courseSearchStr.value)));
  return tableData.filter(value => !courseSearchStr.value || value.course.includes(courseSearchStr.value));
})

let tableColumnHover = reactive(new Array(selectedSchool.value.length).fill(false))

watch(selectedSchool, () => {
  tableData = [];
  courses.value.forEach(value => {
    let isHad = {};

    selectedSchool.value.forEach(val => {
      isHad[val.UniName] = isHadCourse(val, value)
    });

    tableData.push({
      course: value,
      ...isHad,
    });
  });

  if (selectedSchool.value.length === 0) {
    isDialogOpen.value = false;
  }
});

function removeTargetColumn(index) {
  selectedSchoolId.value.splice(index, 1);
}

</script>

<style scoped>
.buttons {
  margin-top: 20px;
}

.table-header {
  display: flex;
  align-items: center;
}

.table-header > svg {
  margin-left: 10px;
  width: 15px;
}

.table-header > svg:hover {
  color: #5A9CF8;
}

.table-header > svg:active {
  color: #88B9F9;
}
</style>
