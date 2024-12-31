<script setup lang="ts">
import SideNav from '../components/SideNav.vue'
import NavBar from '../components/NavBar.vue'
import { useSummaryStore } from '../stores/index'
import { onMounted, ref } from 'vue'

const store = useSummaryStore()

// Reactive variable to check if the screen is desktop or not
const isDesktop = ref(false)

// Check if the screen is desktop when the component is mounted
onMounted(() => {
  isDesktop.value = window.innerWidth >= 768
})

window.addEventListener('resize', () => {
  isDesktop.value = window.innerWidth >= 768
})
</script>

<template>
  <el-container class="h-screen">
    <el-aside v-if="isDesktop" class="bg-black md:py-10 py-4" width="220px">
      <SideNav />
    </el-aside>

    <!-- Mobile view: Use transition for show/hide with v-show -->
    <transition name="slide-fade" v-else>
      <el-aside
        v-show="!isDesktop && store.isMobileNavOpen"
        class="bg-black py-4 md:relative absolute z-50 h-full animate__animated"
        width="220px"
      >
        <SideNav />
      </el-aside>
    </transition>

    <el-container>
      <el-header class="border-b border-[#E6E6E6] !pt-8 !pb-11">
        <NavBar />
      </el-header>
      <el-main class="!py-8">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
