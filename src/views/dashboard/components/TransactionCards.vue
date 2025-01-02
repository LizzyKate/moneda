<script setup lang="ts">
import MdCard from '../../../components/MdCard.vue'
import { type Transaction } from '../../../types/data'

const props = defineProps<{
  transformedData: Transaction[]
  isLoading: boolean
}>()
</script>
<template>
  <el-row :gutter="16" class="w-full 2xl:w-4/5 !ml-auto gap-y-4">
    <el-col :xl="8" :lg="8" :md="12" v-for="(item, index) in props.transformedData" :key="index">
      <el-skeleton v-if="props.isLoading" :rows="1" animated>
        <template #template>
          <el-skeleton-item class="bg-gray-300" />
        </template>
      </el-skeleton>
      <MdCard v-else :title="item.name" :value="item.value" :icon="item.icon"></MdCard>
    </el-col>
  </el-row>
</template>
