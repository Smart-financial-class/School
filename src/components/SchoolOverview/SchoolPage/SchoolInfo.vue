<template>
  <el-card shadow="hover" @mouseout="hover = false" @mouseover="hover = true">
    <template #header>
      <div class="card-header">
        <div :class="{active: hover}" class="title">
          <div class="title-logo">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M576 128v288l96-96 96 96V128h128v768H320V128h256zm-448 0h128v768H128V128z"
                    fill="currentColor"></path>
            </svg>
          </div>
          <div class="title-text">
            <h2 style="margin: 0">{{ name }}</h2>
            <h4 style="margin: 0">{{ type }}</h4>
          </div>
        </div>
        <el-button disabled text>more</el-button>
      </div>
    </template>
    <div class="courses">
      <div v-for="(course, i) in Courses" :key="i" :class="{'text-active': activeCourses.includes(course)}"
           class="course">{{ course }}
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {computed, ref} from "vue";

// eslint-disable-next-line no-undef
let props = defineProps({
  logoSrc: String,
  name: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  courses: {
    required: true,
    type: Array,
  },
  activeCourses: {
    default: () => [],
    type: Array,
  }
})

// 鼠标悬浮在卡片上的效果
let hover = ref(false);


// 学校课程信息
let Courses = computed(() => {
  if (props.courses.length <= 9)
    return props.courses;
  else {
    let cour = props.courses.slice(0, 8);
    cour.push('...')
    return cour;
  }
})

</script>

<style scoped>
.el-card:deep(.el-card__header) {
  padding: 12px 10px;
}

.active {
  color: #5A9CF8;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
}

.title {
  display: flex;
  transition: all 0.5s ease;
}

.title-text {
  height: 50px;
}

.title-logo {
  width: 50px;
  margin: 5px;
}

.courses {
  display: flex;
  flex-wrap: wrap;
}

.course {
  width: 33%;
  min-width: 150px;
  transition: all 0.3s ease;
}

.text-active {
  color: #5A9CF8;
}
</style>
