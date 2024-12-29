<script setup lang="ts">
import SmCard from '../../../components/SmCard.vue'
import { ref } from 'vue'

interface Supplier {
  name: string
  value: string
}

const suppliers = ref<Supplier[]>([
  { name: 'Sahara', value: '$100,000' },
  { name: 'Halliburton', value: '$60,000' },
  { name: 'Baker Hughes', value: '$7,000' },
])
</script>

<template>
  <div class="w-[250px] h-[327px] p-8 rounded-xl card">
    <h3 class="text-lg text-white poppins-bold mb-6">Top OEMs/Suppliers</h3>
    <div class="">
      <div v-for="(supplier, index) in suppliers" :key="index" :class="index !== 0 ? 'mt-4' : ''">
        <SmCard :title="supplier.name" :value="supplier.value" />
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
