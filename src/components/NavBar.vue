<script setup lang="ts">
import { useSummaryStore } from '../stores/index'
import { Bell, User, Menu } from '@element-plus/icons-vue'

const summaryStore = useSummaryStore()

const toggleSideNav = () => {
  summaryStore.toggleSideNav()
}
</script>
<template>
  <div class="px-4 flex justify-between md:justify-end items-center">
    <button class="md:hidden block" @click="toggleSideNav">
      <el-icon size="20" color="#292d32">
        <Menu />
      </el-icon>
    </button>

    <div class="flex space-x-4 justify-end items-center">
      <div class="mt-2">
        <el-icon color="#494949" size="20">
          <bell />
        </el-icon>
      </div>
      <div class="!flex items-center">
        <el-avatar class="!bg-[#e6e6e6] mr-3 !w-8 !h-8">
          <el-icon size="20" color="#292d32">
            <user />
          </el-icon>
        </el-avatar>
        <span class="text-sm poppins-medium text-[#080808]">john doe</span>
      </div>
    </div>
  </div>
</template>
