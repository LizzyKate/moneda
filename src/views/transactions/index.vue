<script setup lang="ts">
import InputField from '../../components/InputField.vue'
import DropdownSelect from '../../components/DropdownSelect.vue'
import CurrencyField from '../../components/CurrencyField.vue'
import FileUpload from '../../components/FileUpload.vue'
import { ref } from 'vue'

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
]

const selectedOption = ref(1)

const handleError = (error: { type: string; message: string }) => {
  console.error('File upload error:', error.message)
  // Handle error as needed (show toast, update UI, etc.)
}

const file = ref<File | null>(null)
</script>
<template>
  <InputField label="Name" modelValue="" type="number" placeholder="no" />
  <DropdownSelect
    v-model="selectedOption"
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
  <div v-if="file" class="mt-4">Selected file: {{ file.name }}</div>
</template>
