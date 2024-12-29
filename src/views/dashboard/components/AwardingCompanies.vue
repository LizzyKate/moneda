<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElScrollbar } from 'element-plus'

interface Company {
  name: string
  color: string
  gridArea: string
}

const companies = ref<Company[]>([
  {
    name: 'Nigeria Petroleum Development Company (NPDC)',
    color: 'bg-purple-400',
    gridArea: 'npdc',
  },
  {
    name: 'Nigerian Navy',
    color: 'bg-pink-400',
    gridArea: 'navy',
  },
  {
    name: 'Coca Cola',
    color: 'bg-purple-700',
    gridArea: 'coca',
  },
  {
    name: 'Others',
    color: 'bg-emerald-400',
    gridArea: 'others1',
  },
  {
    name: 'Saha..',
    color: 'bg-blue-500',
    gridArea: 'saha1',
  },
  {
    name: 'Others',
    color: 'bg-orange-500',
    gridArea: 'others2',
  },
  {
    name: 'Saha..',
    color: 'bg-indigo-800',
    gridArea: 'saha2',
  },
  {
    name: 'First E and P',
    color: 'bg-purple-600',
    gridArea: 'first',
  },
  {
    name: 'Chevron',
    color: 'bg-orange-500',
    gridArea: 'chevron',
  },
  {
    name: 'Newcro..',
    color: 'bg-blue-500',
    gridArea: 'newcro',
  },
  {
    name: 'Saha..',
    color: 'bg-indigo-800',
    gridArea: 'saha2',
  },
])
</script>

<template>
  <div class="flex items-center">
    <h1 class="text-lg text-[#080808] poppins-medium">Transaction by awarding companies</h1>
  </div>

  <el-card
    class="!border-[#efefef] h-[200px] !rounded-lg w-full max-w-6xl mx-auto mt-4 !bg-transparent !p-3 !shadow-none"
  >
    <el-scrollbar height="200px" class="custom-scrollbar">
      <div class="p-4">
        <div class="grid-layout">
          <template v-for="company in companies" :key="company.gridArea">
            <div
              :class="[company.color, ' flex items-center px-4 h-16']"
              :style="{ gridArea: company.gridArea }"
            >
              <span class="text-white poppins-medium text-sm">{{ company.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<style scoped>
.grid-layout {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    'npdc npdc npdc npdc npdc npdc coca coca coca others1 others1 saha1'
    'navy navy navy navy navy navy others2 others2 saha2 saha2 . .'
    'first first first first chevron chevron chevron newcro newcro . . .';
}

.custom-scrollbar :deep(.el-scrollbar__bar) {
  opacity: 0.3;
}

:deep(.el-card) {
  border: none;
  background-color: rgb(17, 17, 17);
}

:deep(.el-card__header) {
  border-bottom: none;
  padding-bottom: 0;
}

.el-card {
  --el-card-padding: 0;
}
</style>
