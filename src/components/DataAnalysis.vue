<template>
  <div class="bottom-content">
    <template v-for="item in panelItem" :key="item.id">
      <div :class="['item', `panel${item.id}`]">
        <div class="pan-left">
          <div class="title">{{ item.title }}</div>
          <span :id="`total-num-${item.id}`" class="number">{{ item.totalNum }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div :class="['pan-right', item.isUp ? 'up' : 'down']">
          <span class="triangle"></span>
          <span :id="`percentage-num-${item.id}`" class="percentage">{{ item.percentage }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { CountUp } from 'countup.js'
const props = defineProps<{
  panelItem: any[]
}>()
watch(
  () => props.panelItem,
  (newVal) => {
    nextTick(() => {
      startAnimation(newVal)
    })
  },
  {
    immediate: true
  }
)
function startAnimation(panelItem: any[] = []) {
  const option1 = {
    decimalPlaces: 1, // 保留一位小数点
    duration: 2,
    useGrouping: false // 1000 -> 1,000
  }
  const option2 = {
    decimalPlaces: 1, // 保留一位小数点
    duration: 2,
    useGrouping: false, // 1000 -> 1,000
    suffix: '%'
  }
  panelItem.forEach((item) => {
    new CountUp(`total-num-${item.id}`, item.totalNum, option1).start()
    new CountUp(`percentage-num-${item.id}`, item.percentage, option2).start()
  })
}
</script>

<style lang="scss" scoped>
.bottom-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .item {
    display: flex;

    .pan-left {
      font-size: 16px;
      color: #ffffff;
      opacity: 0.8;
      .title {
        color: white;
        margin: 50px 0 5px 0;
      }
      .unit {
        font-size: 18px;
        color: #23aeff;
      }
      .number {
        font-size: 36px;
        font-weight: bold;
        color: #23aeff;
        line-height: 60px;
      }
    }
    .pan-right {
      align-self: self-end;
      margin-bottom: 10px;
      margin-left: 15px;
    }
    .triangle {
      display: inline-block;
      margin: 0 5px 2px 0;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
    }
    .up,
    .down {
      font-weight: 300;
    }
    .up {
      color: red;
      .triangle {
        border-bottom: 8px solid #c70013;
      }
    }
    .down {
      color: green;
      .triangle {
        border-top: 8px solid #37a73f;
      }
    }
  }
}
</style>
