<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = [
  {
    title: 'Commodities',
    description: 'Support to traders of essential commodities in the energy industry.',
    icon: Promotion,
  },
  {
    title: 'Procurement',
    description: 'Supply of equipments with funding and execution capacity.',
    icon: Promotion,
  },
  {
    title: 'Services',
    description: 'Support operation, installation and maintenance contracts.',
    icon: Promotion,
  },
]

const selectedIndex = ref<number | null>(null)

onMounted(() => {
  selectedIndex.value = 1
})
</script>
<template>
  <h2 class="poppins-medium text-center text-2xl text-[#140800] leading-8 w-[522px] mx-auto">
    Our products were made just for you, select an option below to get started.
  </h2>
  <div class="flex items-center justify-center space-x-4 mt-8">
    <div
      v-for="(item, index) in products"
      :key="index"
      class="flex justify-center items-center flex-col border-[0.6px] border[#A6A6A6] py-5 px-4 w-[210px] h-[213px] rounded-xl"
      :class="{
        'border border-black': selectedIndex === index,
        'border-[0.6px] border-[#A6A6A6]': selectedIndex !== index,
        'flex justify-center items-center flex-col border-[0.6px] border[#A6A6A6] py-5 px-4 w-[210px] h-[213px] rounded-xl': true,
      }"
      @click="selectedIndex = selectedIndex === index ? null : index"
    >
      <div
        class="w-[64px] h-[64px] flex justify-center items-center bg-[#FFF5EF] rounded-full mb-4"
      >
        <el-icon color="#CC5500" size="32">
          <component :is="item.icon" />
        </el-icon>
      </div>
      <h3 class="text-lg poppins-bold text-[#140800]">{{ item.title }}</h3>
      <p class="poppins-medium text-sm text-[#A6A6A6] mt-2 text-center leading-5">
        {{ item.description }}
      </p>
    </div>
  </div>
  <div class="mt-8 text-center">
    <el-button
      class="!bg-[#CC5500] !rounded-[4px] !border w-[68px] !h-[50px] !py-3 !px-4 !text-white poppins-medium !text-base"
      @click="() => router.push('/transactions')"
    >
      Next
    </el-button>
  </div>
</template>
