<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import useEchart from '@/hooks/useEcharts'
import {
  getPieChartOption,
  getLineChartOption,
  getBarChartOption
} from '@/components/echarts/chartOptions'

const divRef = ref<HTMLDivElement>()
const props = withDefaults(
  defineProps<{
    echartDatas: any[]
    type: string
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
  let option = {}
  if (props.type === 'pie') {
    option = getPieChartOption(echartsData)
  } else if (props.type === 'line') {
    option = getLineChartOption(echartsData)
  } else if (props.type === 'bar') {
    option = getBarChartOption(echartsData)
  }
  myChart.setOption(option)
}
</script>

<style lang="scss" scoped></style>
