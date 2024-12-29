<script setup lang="ts">
import { Bell, User } from '@element-plus/icons-vue'
</script>
<template>
  <el-row class="justify-end items-center">
    <el-col class="mt-2" :span="1">
      <el-icon color="#494949" size="20">
        <bell />
      </el-icon>
    </el-col>
    <el-col class="!flex items-center" :span="4">
      <el-avatar class="!bg-[#E6E6E6] mr-3 !w-8 !h-8">
        <el-icon size="20" color="#292D32">
          <user />
        </el-icon>
      </el-avatar>
      <span class="text-sm poppins-medium text-[#080808]">John Doe</span>
    </el-col>
  </el-row>
</template>
