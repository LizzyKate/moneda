<script setup lang="ts">
import { type CardProps } from '../types/data'

const props = defineProps<CardProps>()
</script>
<template>
  <div class="flex justify-between items-center w-full bg-white rounded-full py-2 px-3">
    <p class="text-xs poppins-medium text-[#665E59]">{{ props.title }}</p>
    <p class="text-[#CC5500] text-base poppins-medium">{{ props.value }}</p>
  </div>
</template>
