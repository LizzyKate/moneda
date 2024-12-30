<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'

interface ModalProps {
  openModal: boolean
  title?: string
}

const props = defineProps<ModalProps>()
const emit = defineEmits(['update:openModal'])
const modalVisible = ref(props.openModal)

watch(
  () => props.openModal,
  (value) => {
    modalVisible.value = value
  },
)

const closeModal = () => {
  modalVisible.value = false
  emit('update:openModal', false)
}
</script>

<template>
  <el-dialog
    v-model="modalVisible"
    :visible="openModal"
    :title="title"
    width="840"
    :show-close="false"
    :close-on-click-modal="false"
    class='h-[557px]'
  >
    <div class="flex justify-end items-center">
      <button @click="closeModal">
        <el-icon color="black" size="20">
          <Close />
        </el-icon>
      </button>
    </div>
    <slot></slot>
  </el-dialog>
</template>

