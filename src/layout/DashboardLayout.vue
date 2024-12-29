<script setup lang="ts">
import SideNav from '../components/SideNav.vue'
import NavBar from '../components/NavBar.vue'
</script>
<template>
  <el-container class="h-screen">
    <el-aside class="bg-black py-10" width="298px">
      <SideNav />
    </el-aside>
    <el-container>
      <el-header class="border-b border-[#E6E6E6] !pt-8 !pb-11">
        <NavBar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
