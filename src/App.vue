<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import useScalePage from '@/hooks/useScalePage'

const options = {
  targetX: 1920,
  targetY: 1080,
  targetRatio: 16 / 9
}
useScalePage(options)
</script>

<style lang="scss" scoped></style>
