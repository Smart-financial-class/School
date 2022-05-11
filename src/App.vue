<template>
  <nav-bar/>
  <!--  背景粒子效果-->
  <Particles
      id="tsparticles"
      :options="ParticlesConfig"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"/>

  <el-row class="content" justify="center">
    <router-view/>
  </el-row>
</template>

<script>
export default {
  name: 'App',
}
</script>

<script setup>
import NavBar from "@/components/NavBar";
import ParticlesConfig from '@/assets/particles.json';
import {loadFull} from "tsparticles";

// 粒子效果用到的函数
const particlesInit = async (engine) => {
  await loadFull(engine);
}
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
}
</script>

<style>
body {
  margin: 0;
  background-size: cover;
}

.content {
  min-width: 800px;
  transform: translateY(60px);

  height: 90%;
}

/*粒子效果样式*/
#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
