<template>
  <div :style="{ minWidth: '300px' }">
    <n-layout id="layout-container">
      <div
        :style="{
          padding: '1.5rem 0',
          paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          flex: '1 1 auto',
        }"
      >
        <slot />
      </div>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { NLayout } from 'naive-ui';

const { calc } = useResponsive();
</script>

<style>
#layout-container > .n-layout-scroll-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
