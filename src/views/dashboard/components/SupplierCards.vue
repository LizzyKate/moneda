<script setup lang="ts">
import SmCard from '../../../components/SmCard.vue'
import { type Supplier } from '../../../types/data'

const props = defineProps<{
  suppliers: Supplier[]
  isLoading: boolean
}>()
</script>

<template>
  <div class="lg:w-[250px] min-h-[327px] p-8 rounded-xl card">
    <h3 class="text-lg text-white poppins-bold mb-6">Top OEMs/Suppliers</h3>
    <div class="">
      <div
        v-for="(supplier, index) in props.suppliers"
        :key="index"
        :class="index !== 0 ? 'mt-4' : ''"
      >
        <el-skeleton v-if="props.isLoading" :rows="1" animated>
          <template #template>
            <div class="h-4 bg-gray-300"></div>
          </template>
        </el-skeleton>
        <SmCard v-else :title="supplier.name" :value="supplier.value_usd" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: linear-gradient(180deg, #140800 0%, #7a3100 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
