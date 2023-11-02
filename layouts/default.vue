<template>
  <div :style="{ minWidth: '300px' }">
    <n-layout id="layout-container">
      <n-layout-header
        :style="{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99,
          width: '100%',
          maxWidth: '100%',
          padding: '1.5rem 0',
          paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          boxShadow: themeVars.boxShadow1,
        }"
        @vue:mounted="onHeaderMounted"
      >
        <Header />
      </n-layout-header>

      <div
        :style="{
          padding: '1.5rem 0',
          paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          flex: '1 1 auto',
          marginTop: `${headerHeight}px`,
        }"
      >
        <slot />
      </div>

      <n-layout-footer
        position="static"
        :style="{
          padding: '1.5rem 0',
          paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          backgroundColor: '#18181c',
          color: themeVars.baseColor,
        }"
      >
        <Footer />
      </n-layout-footer>
    </n-layout>

    <Cart v-model:show="isCartShown" />
  </div>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutFooter, useThemeVars } from 'naive-ui';

const headerHeight = ref(0);
const themeVars = useThemeVars();
const { isCartShown } = useCart();
const { calc } = useResponsive();

const onHeaderMounted = (node: VNode) => {
  headerHeight.value = node.el?.offsetHeight ?? 0;
};
</script>

<style>
#layout-container > .n-layout-scroll-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
