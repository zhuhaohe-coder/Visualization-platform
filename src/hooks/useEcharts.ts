import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

export default function useEcharts(divEl: HTMLDivElement) {
  // init(dom,theme,opts)
  const echartsInstance = echarts.init(divEl, null, { renderer: 'canvas' })

  onUnmounted(() => {
    echartsInstance.dispose() // 销毁实例
  })

  function setOption(option: echarts.EChartsOption) {
    echartsInstance.setOption(option)
  }

  function resizeEchart() {
    echartsInstance.resize()
  }

  return {
    echartsInstance,
    setOption,
    resizeEchart
  }
}
