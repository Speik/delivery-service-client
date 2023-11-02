<template>
  <n-config-provider
    :breakpoints="getGridBreakpoints()"
    abstract
  >
    <n-message-provider placement="top-right">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <ClientOnly>
        <OrdersNotifications />
      </ClientOnly>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui';

const APP_NAME = 'Delivery Service';
const { breakpoints, defineCurrentScreenSize } = useResponsive();

const getGridBreakpoints = () => {
  const entries = breakpoints.entries();

  return Object.fromEntries(
    [...entries].reverse()
  );
};

useHead({
  titleTemplate: titleChunk => {
    return titleChunk
      ? `${APP_NAME} | ${titleChunk}`
      : APP_NAME;
  }
});

onNuxtReady(defineCurrentScreenSize);
</script>
