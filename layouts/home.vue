<template>
  <div :style="{ minWidth: '300px' }">
    <n-layout>
      <n-layout-header
        :style="{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99,
          width: '100%',
          maxWidth: '100%',
          padding: isPageScrolled ? '1.5rem 0' : '.75rem 0',
          paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          transition: '.3s ease',
          ...(!isPageScrolled && { backgroundColor: 'transparent' }),
          ...(isPageScrolled && { boxShadow: themeVars.boxShadow1 }),
        }"
      >
        <Header :inverted="!isPageScrolled" />
      </n-layout-header>

      <slot />

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

const PAGE_SCROLL_BIAS = 16;
const isPageScrolled = ref(false);
const themeVars = useThemeVars();
const { isCartShown } = useCart();
const { calc } = useResponsive();

/**
 * For unknown reason native @scroll event handler
 * doesn't work with SSR. Seems it's NaiveUI bug.
 */
onMounted(() => {
  window.addEventListener('scroll', () => {
    isPageScrolled.value = window.scrollY > PAGE_SCROLL_BIAS;
  });
});
</script>
