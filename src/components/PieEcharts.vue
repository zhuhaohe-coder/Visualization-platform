<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import useEchart from '@/hooks/useEcharts'
import { getPieChartOption } from '@/components/echarts/chartOptions'

const divRef = ref<HTMLDivElement>()
const props = withDefaults(
  defineProps<{
    echartDatas: any[]
    width?: number | string
    height?: number | string
  }>(),
  {
    width: '100%',
    height: '100%'
  }
)

watch(
  () => props.echartDatas,
  (newVal) => {
    setupEcharts(newVal)
  }
)

onMounted(() => {
  setupEcharts(props.echartDatas)
})

interface ECharts {
  echartsInstance: echarts.ECharts
  setOption: (option: echarts.EChartsOption) => void
  resizeEchart: () => void
}

let myChart: null | ECharts = null

function setupEcharts(echartsData: any[]) {
  if (!myChart) {
    myChart = useEchart(divRef.value as HTMLDivElement)
  }
  const option = getPieChartOption(echartsData)
  myChart.setOption(option)
}
</script>

<style lang="scss" scoped></style>
