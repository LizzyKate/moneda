<script setup lang="ts">
import { Bell, User } from '@element-plus/icons-vue'
</script>
<template>
  <div class="flex px-4 space-x-4 justify-end items-center">
    <div class="mt-2" :span="1">
      <el-icon color="#494949" size="20">
        <bell />
      </el-icon>
    </div>
    <div class="!flex items-center" :span="3">
      <el-avatar class="!bg-[#e6e6e6] mr-3 !w-8 !h-8">
        <el-icon size="20" color="#292d32">
          <user />
        </el-icon>
      </el-avatar>
      <span class="text-sm poppins-medium text-[#080808]">john doe</span>
    </div>
  </div>
</template>
