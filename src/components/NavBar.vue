<template>
  <el-menu :default-active="current" class="nav" mode="horizontal" router>
    <el-image :src="logo" class="logo" fit="scale-down" @click="to('index')"/>
    <el-menu-item :route="{name: 'index'}" index="index">
      主页
    </el-menu-item>
    <el-menu-item :route="{name: 'overview'}" index="overview">
      高校总览
    </el-menu-item>
    <el-menu-item :route="{name: 'enroll'}" disabled index="enroll">
      招生就业
    </el-menu-item>
    <el-menu-item :route="{name: 'community'}" disabled index="community">
      社区
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {ref, watch} from "vue";
import logo from '@/assets/logo.png'
import {useRoute, useRouter} from 'vue-router';


let current = ref('');
let route = useRoute();
let router = useRouter()

watch(() => route.name, () => {
  current.value = route.name;
});

function to(name) {
  router.push({name});
}
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
  max-width: 300px;
}

</style>
