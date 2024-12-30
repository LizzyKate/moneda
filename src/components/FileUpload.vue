<script setup lang="ts">
import { ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'

interface FileProps {
  maxSize?: number
  allowedTypes?: string[]
  required?: boolean
  label?: string
}

const props = withDefaults(defineProps<FileProps>(), {
  maxSize: 2,
  allowedTypes: () => ['.pdf', '.docx', '.pptx', '.xlsx'],
  required: false,
  label: 'Upload file',
})

const emit = defineEmits(['update:modelValue', 'error'])
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const error = ref<string>('')

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (file.size > props.maxSize * 1024 * 1024) {
    error.value = `File size exceeds ${props.maxSize}MB limit`
    emit('error', error.value)
    return
  }

  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!props.allowedTypes.includes(fileExtension)) {
    error.value = 'Invalid file type'
    emit('error', error.value)
    return
  }

  selectedFile.value = file
  emit('update:modelValue', file)
  error.value = ''
}
</script>

<template>
  <div class="w-full">
    <label class="block text-sm font-medium mb-1" :class="{ 'text-red-500': error }">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>

    <div
      class="flex justify-center w-[152px] h-[50px] items-center border border-[#E5E7EB] rounded-[4px] py-3 px-4 cursor-pointer hover:bg-gray-50"
      :class="{ 'border-red-500': error }"
      @click="() => fileInput?.click()"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="allowedTypes.join(',')"
        @change="handleFileChange"
      />

      <el-icon>
        <Upload color="#111827" size="15" />
      </el-icon>

      <div class="ml-2">
        <span class="text-base poppins-medium text-[#1F2937]">Upload file</span>
      </div>
    </div>
    <div v-if="selectedFile" class="text-sm text-[#665E59]">
      {{ selectedFile.name }}
    </div>
    <div v-else>
      <p class="text-xs poppins-regular text-[#665E59] mt-1">
        Max file size <strong>{{ maxSize }}MB</strong> ({{ allowedTypes.join(', ') }})
      </p>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>
