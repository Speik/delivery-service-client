<template>
  <n-tag
    v-bind="$attrs"
    :bordered="false"
    :color="{
      color: toRgba(currentStatusMeta.color, 0.15),
      textColor: currentStatusMeta.color,
    }"
  >
    {{ currentStatusMeta.label }}
  </n-tag>
</template>

<script setup lang="ts">
import { NTag, useThemeVars } from 'naive-ui';

import { useColorConverter } from '~/composables';
import { OrderStatus } from '~/declarations';

type StatusMeta = {
  label: string;
  color: string;
  hidden?: boolean;
}

const props = defineProps<{value: OrderStatus}>();

const { toRgba } = useColorConverter();
const themeVars = useThemeVars();

const statuses = new Map<OrderStatus, StatusMeta>([
  [OrderStatus.CREATED, {
    label: 'Created',
    color: themeVars.value.textColor3,
  }],
  [OrderStatus.CONFIRMED, {
    label: 'Confirmed',
    color: themeVars.value.infoColor,
  }],
  [OrderStatus.COOKING, {
    label: 'Cooking',
    color: themeVars.value.successColorSuppl,
  }],
  [OrderStatus.DELIVERING, {
    label: 'Delivering',
    color: themeVars.value.successColorPressed,
  }],
  [OrderStatus.WAITING, {
    label: 'Waiting',
    color: themeVars.value.successColorPressed,
  }],
  [OrderStatus.COMPLETED, {
    label: 'Completed',
    color: '#6c00e7',
  }],
  [OrderStatus.CANCELLED, {
    label: 'Cancelled',
    color: themeVars.value.errorColor,
  }],
]);

const currentStatus = ref<OrderStatus>(OrderStatus.CONFIRMED);

const currentStatusMeta = computed(() => {
  const meta = statuses.get(currentStatus.value);

  if (!meta) {
    return {
      label: 'Unknown',
      color: themeVars.value.textColor1,
    };
  }

  return meta;
});

onBeforeMount(() => {
  currentStatus.value = props.value;
});
</script>
