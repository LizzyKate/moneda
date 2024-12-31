<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { type TransactionData } from '../../../types/data'

const props = defineProps<{
  transactionData: TransactionData[]
  isLoading: boolean
}>()

Chart.register(...registerables)

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart<'doughnut', number[], string> | null = null

const createOrUpdateChart = () => {
  if (!chartCanvas.value) return

  // Extract labels and data
  const labels = props.transactionData.map((data) => data.transaction_type)
  const data = props.transactionData.map((data) => parseFloat(data.value_usd))

  // If a chart instance exists, destroy it before creating a new one
  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#CC5500', '#007ACC', '#4D3626'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 13,
              family: 'Poppins',
              weight: '400',
            },
            color: '#494949',
          },
        },
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  })
}

watch(
  () => props.transactionData,
  (newData) => {
    if (newData.length > 0) {
      createOrUpdateChart()
    }
  },
  { immediate: true },
)

// Ensure the chart is properly initialized after the DOM is mounted
onMounted(() => {
  if (props.transactionData.length > 0) {
    createOrUpdateChart()
  }
})
</script>

<template>
  <div
    class="border-[0.6px] border-[#D1D1D1] w-[354px] 2xl:w-[600px] 2xl:h-[700px] h-[397px] p-6 rounded-lg"
  >
    <h2 class="poppins-medium text-lg text-[#080808] mb-3">Transaction by product</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
