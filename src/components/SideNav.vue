<script lang="ts" setup>
import { Menu as IconMenu, Document, DArrowLeft } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-row class="h-full w-3/4 mx-auto">
    <el-col class="!flex-grow">
      <div class="mx-auto w-[47.38px] h-[38.06px] mb-12">
        <img src="@/assets/images/logo.svg" class="w-full h-full" alt="logo" />
      </div>
      <el-menu
        active-text-color="#ffffff"
        active-background-color="#000"
        background-color="none"
        class="el-menu-vertical-demo !border-0"
        default-active="2"
        text-color="#ffffff66"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span class="poppins-medium text-sm tracking-wide">Dashboard</span>
        </el-menu-item>
        <el-menu-item index="2" class="mt-4">
          <el-icon><document /></el-icon>
          <span class="poppins-medium text-sm tracking-wide">Transactions</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-button
      class="w-full !pl-5 !text-[#ffffff66] !justify-start !bg-transparent !border-0 mt-auto poppins-medium text-sm"
      @click="handleLogout"
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
/* .el-button .el-icon {
  margin-left: 20px;
} */

.el-menu-item.is-active {
  background-color: #cc5500;
  border-radius: 8px;
}
</style>
