<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

// const options = [
//   { label: 'Option 1', value: 1 },
//   { label: 'Option 2', value: 2 },
//   { label: 'Option 3', value: 3 },
// ]

// const selectedOption = ref(1)

// const handleError = (error: { type: string; message: string }) => {
//   console.error('File upload error:', error.message)
//   // Handle error as needed (show toast, update UI, etc.)
// }

// const file = ref<File | null>(null)

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
  </div>
  <!-- <InputField label="Name" modelValue="" type="number" placeholder="no" />
  <DropdownSelect
    v-model="selectedOption"x
    :options="options"
    label="Select an Option"
    placeholder="Please choose an option"
  />
  <CurrencyField label="usd" />
  <FileUpload
    v-model="file"
    :max-size="2"
    :allowed-types="['.pdf', '.docx', '.pptx', '.xlsx']"
    required
    @error="handleError"
  />
  <div v-if="file" class="mt-4">Selected file: {{ file.name }}</div> -->
</template>

<style scoped>
.__container {
  box-shadow: 0px 21px 30.3px -10px #0000000f;
}
</style>
