import { onMounted, onUnmounted } from 'vue'
import _ from 'lodash'

interface IOption {
  targetX?: number //宽
  targetY?: number //高
  targetRatio?: number // 宽高比率
}

/**
 * 大屏适配的hooks
 */
export default function useScalePage(option: IOption) {
  // 节流
  const resizeFunc = _.throttle(function () {
    triggerScale(option) // 动画缩放网页
  }, 100)

  onMounted(() => {
    triggerScale(option)
    window.addEventListener('resize', resizeFunc)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeFunc)
  })
}

//大屏的适配
function triggerScale(option: IOption = {}) {
  //1.设计稿的尺寸
  const targetX = option.targetX || 1920
  const targetY = option.targetY || 1080
  const targetRatio = option.targetRatio || 16 / 9

  //2.拿到当前设备的宽高
  const currentX = document.documentElement.clientWidth || document.body.clientWidth
  const currentY = document.documentElement.clientHeight || document.body.clientHeight

  //3.计算缩放比例
  let scaleRatio = currentX / targetX //参照宽度进行缩放
  const currentRatio = currentX / currentY //宽高比例

  //超宽屏
  scaleRatio = currentRatio > targetRatio ? currentY / targetY : scaleRatio
  ;(document.body as HTMLElement).style.width = `${targetX}px`
  ;(document.body as HTMLElement).style.height = `${targetY}px`
  ;(document.body as HTMLElement).style.transform = `scale(${scaleRatio}) translateX(-50%)`
  ;(document.body as HTMLElement).style.left = '50%'
}
