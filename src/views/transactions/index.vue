<script setup lang="ts">
import { ArrowLeft, Check } from '@element-plus/icons-vue'
import { ref } from 'vue'
import AwardingCompanyForm from './components/AwardingCompanyForm.vue'
import SupplierForm from './components/SuppliersForm.vue'

const sections = ['Awarding Company', 'Suppliers']

const currentForm = ref(0)
const updateCurrentForm = (value: number) => {
  currentForm.value = value
}
</script>
<template>
  <el-button
    :icon="ArrowLeft"
    class="!text-[#CC5500] !border-0 !text-sm poppins-medium"
    @click="$router.go(-1)"
  >
    Back
  </el-button>
  <h1 class="text-[32px] text-black poppins-bold mt-8">New Procurement Transaction</h1>
  <div class="mx-auto mt-16 w-3/4 rounded-[14px] __container">
    <div class="w-full rounded-t-[14px] bg-[#EFEFEF] flex justify-between items-center pt-8">
      <div
        v-for="(title, index) in sections"
        :key="index"
        :class="{ 'border-b border-[#CC5500] w-2/5': index === currentForm }"
      >
        <div class="flex items-center space-x-4 mb-8 px-12">
          <div
            class=""
            :class="{
              'bg-[#CC5500] justify-center items-center flex border-0': index === currentForm,
              'w-5 h-5 border border-[#080808] rounded-full p-3': true,
            }"
          >
            <el-icon v-if="index === currentForm">
              <Check color="white" size="8" />
            </el-icon>
          </div>
          <p class="poppins-medium text-base text-[#080808]">{{ title }}</p>
        </div>
      </div>
    </div>
    <div class="p-12">
      <div v-if="currentForm === 0">
        <AwardingCompanyForm @update:currentForm="updateCurrentForm($event)" />
      </div>
      <div v-if="currentForm === 1">
        <SupplierForm @update:currentForm="updateCurrentForm($event)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.__container {
  box-shadow: 0px 21px 30.3px -10px #0000000f;
}
</style>
