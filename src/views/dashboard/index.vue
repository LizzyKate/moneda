<script setup lang="ts">
import MdCard from '../../components/MdCard.vue'
import SmCards from '../../components/SmCards.vue'
import {  Document } from '@element-plus/icons-vue'
</script>
<template>
  <div>
    <MdCard  title="Total Transactions" value="123" :icon="Document"  />
    <SmCards title="Sahara" value="$10000" />
  </div>
</template>
