<template>
  <div class="water-ball">
    <!-- 波浪icon -->
    <svg x="0px" y="0px" style="display: none">
      <symbol id="wave">
        <path
          d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
        ></path>
        <path
          d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
        ></path>
      </symbol>
    </svg>

    <!-- 水球 -->
    <div class="box" :style="{ width: size, height: size }">
      <div class="percent" :style="{ fontSize: countSize }">
        <div class="percentNum" id="count" ref="countRef">0</div>
        <div class="percentB">%</div>
      </div>
      <!-- 这个元素往上移 -->
      <div id="water" class="water" ref="waterRef">
        <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
          <use xlink:href="#wave"></use>
        </svg>
        <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// const props = defineProps({
//   size: {
//     type: String,
//     default: '190px'
//   },
//   // 目标进度
//   percentage: {
//     type: Number,
//     default: 0
//   },
//   countSize: {
//     type: String,
//     default: '40px'
//   }
// })
const props = withDefaults(
  defineProps<{
    size: string
    percentage: number
    countSize: string
  }>(),
  {
    size: '190px',
    percentage: 0,
    countSize: '40px'
  }
)

const countRef: Ref<HTMLDivElement | null> = ref(null)
const waterRef: Ref<HTMLDivElement | null> = ref(null)

watch(
  () => props.percentage,
  (newV) => {
    startAnimation(newV)
  }
)

function startAnimation(percentage: number) {
  let percent = 0 // 数据初始值 0
  let interval: number
  // 1.定时更新数据
  interval = setInterval(function () {
    if (countRef.value && waterRef.value) {
      countRef.value.innerHTML = percent + ''
      if (percent <= 100) {
        // 2.超过100不能移动
        waterRef.value.style.transform = 'translate(0' + ',' + (100 - percent) + '%)'
      }
      // 3.停止定时
      if (percent >= percentage) {
        countRef.value.innerHTML = percentage + ''
        clearInterval(interval)
      }
      percent++
    }
  }, 60)
}
</script>

<style scoped>
.water-ball {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  overflow: hidden;
}
.box .percent {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.box .water {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  transform: translate(0, 100%);
  background: #00c6ff;
}
/* 波浪定位 */
.box .water_wave {
  width: 200%;
  position: absolute;
  bottom: 100%;
}

/* ============波浪动画============ */
.box .water_wave_back {
  right: 0;
  fill: #c7eeff;
  animation: wave-back 1.4s infinite linear;
}
.box .water_wave_front {
  left: 0;
  fill: #00c6ff;
  margin-bottom: -1px;
  animation: wave-front 0.7s infinite linear;
}
@keyframes wave-front {
  100% {
    transform: translateX(-50%);
  }
}
@keyframes wave-back {
  100% {
    transform: translateX(50%);
  }
}
/* ============波浪动画============ */
</style>
