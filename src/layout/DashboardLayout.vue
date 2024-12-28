<script setup lang="ts">
import SideNav from '../components/SideNav.vue'
</script>
<template>
  <el-container class="h-screen">
    <el-aside class="bg-black py-10" width="298px">
      <SideNav />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
