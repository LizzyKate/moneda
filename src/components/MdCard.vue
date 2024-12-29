<script setup lang="ts">
import type { Component } from 'vue'

interface CardProps {
  title: string
  value: string
  icon: Component
}

const props = defineProps<CardProps>()
</script>
<template>
  <div
    class="w-full h-[154px] border-[7px] border-[#E6E6E6] rounded-[18px] flex justify-center items-center"
  >
    <div class="rounded-full bg-[#e6e6e6] w-[57px] h-[57px] flex items-center justify-center">
      <el-icon size="27" color="#CC5500">
        <component :is="props.icon" />
      </el-icon>
    </div>
    <div class="ml-6">
      <p class="text-[#665E59] poppins-medium text-sm">{{ props.title }}</p>
      <p class="text-[#140800] poppins-medium text-[32px]">{{ props.value }}</p>
    </div>
  </div>
</template>
