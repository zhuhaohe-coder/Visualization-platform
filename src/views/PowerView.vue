<template>
  <main class="screen-bg">
    <div class="header"></div>
    <div class="container">
      <div class="left">
        <div class="left-top"></div>
        <div class="left-bottom"></div>
      </div>
      <div class="center">
        <div class="center-top"></div>
        <div class="center-bottom"></div>
      </div>
      <div class="right">
        <div class="right-top"></div>
        <div class="right-center"></div>
        <div class="right-bottom"></div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getPowerScreenData } from '@/services'
import { ref } from 'vue'
// 充电桩饱和比例
const chargingPile = ref({})
// 流程监控
const processMonitoring = ref({})
// 充电桩数据分析
const chargingStatistics = ref({})
// 异常监控
const exceptionMonitoring = ref({})
// 充电桩数据分析
const dataAnalysis = ref({})
// 充电桩Top4占比
const chargingTop4 = ref({})
const percentage = ref([])

getPowerScreenData().then((res: any) => {
  chargingPile.value = res.data.data.chargingPile.data
  processMonitoring.value = res.data.data.processMonitoring.data
  chargingStatistics.value = res.data.data.chargingStatistics.data
  exceptionMonitoring.value = res.data.data.exceptionMonitoring.data
  dataAnalysis.value = res.data.data.dataAnalysis.data
  chargingTop4.value = res.data.data.chargingTop4.data
  percentage.value = res.data.data.chargingTop4.totalPercentage
})
</script>

<style lang="scss" scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-color: #070a3c;
  background-image: url(@/assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .header {
    margin-top: 20px;
    height: 56px;
    background-image: url(@/assets/images/bg_header.svg);
    background-repeat: no-repeat;
  }
  .container {
    margin: 0 16px;
    display: flex;
    justify-content: space-between;
    .left {
      .left-top,
      .left-bottom {
        margin-top: 40px;
        width: 536px;
        height: 443px;
      }
      .left-top {
        background-image: url(@/assets/images/bg_left-top.svg);
        background-repeat: no-repeat;
      }
      .left-bottom {
        background-image: url(@/assets/images/bg_left_bottom.svg);
        background-repeat: no-repeat;
      }
    }
    .right {
      .right-top,
      .right-center {
        margin-top: 25px;
        width: 519px;
        height: 327px;
      }
      .right-top {
        background-image: url(../assets/images/bg_right_top.svg);
        background-repeat: no-repeat;
      }
      .right-center {
        background-image: url(../assets/images/bg_right_center.svg);
        background-repeat: no-repeat;
      }
      .right-bottom {
        margin-top: 25px;
        width: 519px;
        height: 242px;
        background-image: url(../assets/images/bg_right_bottom.svg);
        background-repeat: no-repeat;
      }
    }
    .center {
      .center-top {
        width: 823px;
        height: 710px;
      }
      .center-bottom {
        margin-top: 48px;
        width: 823px;
        height: 209px;
        background-image: url(../assets/images/bg_bottom.svg);
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
