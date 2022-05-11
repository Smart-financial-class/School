<template>
  <el-menu :default-active="current" class="nav" mode="horizontal" router>
    <el-image :src="logo" class="logo" fit="scale-down"/>
    <el-menu-item :route="{name: 'overview'}" index="overview">
      高校总览
    </el-menu-item>
    <el-menu-item :route="{name: 'introduce'}" index="introduce">
      专业介绍
    </el-menu-item>
    <el-menu-item :route="{name: 'enroll'}" disabled index="enroll">
      招生就业
    </el-menu-item>
    <el-menu-item :route="{name: 'community'}" disabled index="community">
      社区
    </el-menu-item>
    <el-sub-menu :show-timeout="100" disabled index="data">
      <template #title>数据分析</template>
      <el-menu-item :route="{name: 'overview'}" index="data/compare">
        课程对比
      </el-menu-item>
      <el-menu-item :route="{name: 'overview'}" index="data/plan">
        培养计划
      </el-menu-item>
      <el-menu-item :route="{name: 'overview'}" index="data/graph">
        图表分析
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<script setup>
import {onMounted, ref, watch} from "vue";
import logo from '@/assets/logo.png'
import {useRoute} from 'vue-router';


let current = ref('');
let route = useRoute();

watch(() => route.name, () => {
  current.value = route.name;
})
</script>

<style scoped>
.nav {
  height: 50px;
  position: fixed;
  width: 100vw;
  z-index: 999;
}

.logo {
  margin: 10px;
  height: 30px;
  min-width: 240px;
}

</style>
