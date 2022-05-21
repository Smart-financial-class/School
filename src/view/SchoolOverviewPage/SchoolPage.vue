<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-scrollbar
          v-show="schools.length !== 0"
          ref="scrollbar"
          max-height="780px"
      >
        <el-row justify="center" style="margin-top: 20px">
          <transition-group appear name="school">
            <el-col
                v-for="(school, i) in schools"
                :key="school.UniId"
                :data-index="i"
                :span="20"
                :style="{ transitionDelay: '' + i * 30 + 'ms' }"
            >
              <school-info
                  :activeCourses="activeCourses"
                  :courses="school.information.map((value) => value.courseName)"
                  :name="school.UniName"
                  :type="school.type"
                  style="margin: 10px 0"
              />
            </el-col>
          </transition-group>
        </el-row>
      </el-scrollbar>
      <h2 v-show="schools.length === 0" style="text-align: center">
        该页面展示开设了<b>智能财务</b>专业的高校的相关信息
      </h2>
    </el-col>
    <el-col :span="6">
      <el-space :size="20" direction="vertical" fill>
        <el-card class="choice" header="高校类别" shadow="never">
          <el-checkbox
              v-model="cateSelectAll"
              :indeterminate="isIndeterminate"
              label="all"
              style="margin-bottom: 8px"
              @change="handleCateSelectAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
              v-model="activeCate"
              @change="handleCateActiveChange"
          >
            <el-checkbox
                v-for="(category, i) in categories"
                :key="i + category"
                :label="category"
                style="display: block"
            >
              {{ category }}
            </el-checkbox>
          </el-checkbox-group>
        </el-card>
        <el-card class="choice" header="课程" shadow="never">
          <el-input v-model="searchInput" placeholder="搜索课程"/>
          <el-divider/>
          <el-checkbox-group v-model="activeCourses">
            <el-scrollbar height="300px" max-height="350px">
              <transition-group name="course">
                <el-checkbox
                    v-for="(course, i) in courses"
                    :key="course"
                    :label="course"
                    :style="{ transitionDelay: String(i * 15) + 'ms' }"
                    style="display: block; margin: 0"
                >
                  {{ course }}
                </el-checkbox>
              </transition-group>
            </el-scrollbar>
          </el-checkbox-group>
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { useStore } from "vuex";
import SchoolInfo from "@/components/SchoolOverview/SchoolPage/SchoolInfo.vue";
import { School, SchoolState } from "@/store/School";
import type { ElScrollbar } from "element-plus";

/* store */
let store = useStore<SchoolState>();

/* 学校相关信息 */
let schools = computed<School[]>(() => {
  return store.state.schools.filter((value) => {
    // 过滤符合类别的
    let cate = activeCate.value.includes(value.type);
    // 过滤含有目标课程的
    let cnt = 0;
    let course = value.information.map((val) => val.courseName);
    activeCourses.value.forEach((val) => {
      if (course.includes(val)) cnt++;
    });
    return cnt === activeCourses.value.length && cate;
  });
});

/* 课程信息 */
let searchInput = ref<string>("");
let activeCourses = ref<string[]>([]);
let courses = computed<string[]>(() => {
  return store.getters["School/courses"].filter((value: string) =>
      value.includes(searchInput.value)
  );
});

/* 实现学校类别的选择 */
let cateSelectAll = ref<boolean>(true);
let categories = computed<string[]>(() => store.getters["School/schoolCategory"]);
let activeCate = ref<string[]>(categories.value);
let isIndeterminate = ref<boolean>(false);
let scrollbar = ref<InstanceType<typeof ElScrollbar>>();

function handleCateSelectAllChange(value: string[]) {
  // 当类别变动时，滚动到最上方
  nextTick(() => {
    scrollbar.value?.setScrollTop(0);
  });
  activeCate.value = value ? categories.value : [];
  isIndeterminate.value = false;
}

function handleCateActiveChange(value: string[]) {
  // 当类别变动时，滚动到最上方
  nextTick(() => {
    scrollbar.value?.setScrollTop(0);
  });
  cateSelectAll.value = value.length === categories.value.length;
  isIndeterminate.value = value.length > 0 && value.length < categories.value.length;
}
</script>

<style scoped>
.choice {
  min-width: 33%;
}

.school-enter-active,
.school-leave-active {
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
}

.school-move {
  transition: all 1s ease;
}

.school-enter-from,
.school-leave-to {
  opacity: 0;
  transform: translateX(30%);
}

.school-enter,
.school-leave {
  opacity: 1;
}

.course-enter-active,
.course-leave-active {
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
}

.course-enter-from,
.course-leave-to {
  opacity: 0;
  transform: scale(0.01);
}

.course-enter,
.course-leave {
  opacity: 1;
  transform: scale(1);
}
</style>
