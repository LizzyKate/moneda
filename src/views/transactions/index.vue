<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import AwardingCompanyForm from './components/AwardingCompanyForm.vue'
import SupplierForm from './components/SuppliersForm.vue'

const sections = ['Awarding Company', 'Suppliers']
</script>
<template>
  <el-button :icon="ArrowLeft" class="!text-[#CC5500] !border-0 !text-sm poppins-medium">
    Back
  </el-button>
  <h1 class="text-[32px] text-black poppins-bold mt-8">New Procurement Transaction</h1>
  <div class="mx-auto mt-16 w-3/4 rounded-[14px] __container">
    <div class="w-full rounded-t-[14px] bg-[#EFEFEF] flex justify-between items-center pt-8">
      <div v-for="(title, index) in sections" :key="index" class="border-b border-[#CC5500] w-2/5">
        <div class="flex items-center space-x-4 mb-8 px-12">
          <div class="w-5 h-5 border border-[#080808] rounded-full"></div>
          <p class="poppins-medium text-base text-[#080808]">{{ title }}</p>
        </div>
      </div>
    </div>
    <div class="p-12">
      <!-- <AwardingCompanyForm /> -->
      <SupplierForm />
    </div>
  </div>

  <!-- <FileUpload
    v-model="file"
    :max-size="2"
    :allowed-types="['.pdf', '.docx', '.pptx', '.xlsx']"
    required
    @error="handleError"
  />
  <div v-if="file" class="mt-4">Selected file: {{ file.name }}</div>  -->
</template>

<style scoped>
.__container {
  box-shadow: 0px 21px 30.3px -10px #0000000f;
}
</style>
