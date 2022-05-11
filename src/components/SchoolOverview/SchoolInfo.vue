<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <div class="title">
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
      <div v-for="(course, i) in cutedCourses" :key="i" class="course">{{ course }}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "SchoolInfo"
}
</script>

<script setup>
import {computed} from "vue";
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
})

let cutedCourses = computed(() => {
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
}

.title {
  display: flex;
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
}
</style>
