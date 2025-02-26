<script lang="ts" setup>
import { Menu as IconMenu, Close, Document, DArrowLeft } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useSummaryStore } from '../stores/index'

const summaryStore = useSummaryStore()

const toggleSideNav = () => {
  summaryStore.toggleSideNav()
}

const router = useRouter()
const route = useRoute()

// const activeMenu = computed(() => {
//   const path = route.path
//   if (path === '/') return '1'
//   if (path === '/transactions') return '2'
//   return ''
// })

const activeMenu = computed(() => {
  const path = route.path
  if (path === '/') return '1'
  if (path === '/transactions') return '4' // Changed from '2' to '4'
  return ''
})

const navigateAndClose = (path: string) => {
  router.push(path)
  toggleSideNav()
}
</script>

<template>
  <el-row class="h-full md:w-3/4 w-4/5 mx-auto">
    <el-col class="!flex-grow">
      <div class="flex items-center justify-between lg:mt-8 mt-4 xl:mb-8 lg:mb-0 xs:mb-12">
        <div class="mx-auto w-[47.38px] h-[38.06px] md:mb-12">
          <img src="@/assets/images/logo.svg" class="w-full h-full" alt="logo" />
        </div>
        <div class="block md:hidden text-end w-full h-10">
          <el-button
            class="!text-[#ffffff66] !p-0 !justify-start !bg-transparent !border-0 mt-auto poppins-medium text-sm"
            @click="toggleSideNav"
          >
            <el-icon><Close color="white" size="20" /></el-icon>
            <span class="!ml-5 tracking-wide">Close</span>
          </el-button>
        </div>
      </div>
      <el-menu
        :default-active="activeMenu"
        active-text-color="#ffffff"
        active-background-color="#000"
        background-color="none"
        class="el-menu-vertical-demo !border-0"
        text-color="#ffffff66"
      >
        <el-menu-item index="1" @click="navigateAndClose('/')">
          <el-icon><icon-menu /></el-icon>
          <span class="poppins-medium text-sm tracking-wide">Dashboard</span>
        </el-menu-item>
        <el-menu-item index="2" class="mt-4" @click="navigateAndClose('/transactions')">
          <el-icon><document /></el-icon>
          <span class="poppins-medium text-sm tracking-wide">Transactions</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-button
      class="w-full !pl-5 !text-[#ffffff66] !justify-start !bg-transparent !border-0 mt-auto poppins-medium text-sm"
    >
      <el-icon><d-arrow-left /></el-icon>
      <span class="!ml-5 tracking-wide">Logout</span>
    </el-button>
  </el-row>
</template>

<style scoped>
.el-menu-item {
  padding: 10px 0;
  height: 44px;
}
.el-button {
  height: 44px;
}
button > span {
  margin-left: 20px;
}

.el-menu-item.is-active {
  background-color: #cc5500;
  border-radius: 8px;
}
</style>
