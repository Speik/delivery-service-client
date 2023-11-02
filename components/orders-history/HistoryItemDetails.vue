<template>
  <n-drawer
    v-bind="$attrs"
    :width="checkMobileScreen() ? '100%' : 384"
  >
    <n-drawer-content
      v-if="data"
      :native-scrollbar="false"
      closable
    >
      <template #header>
        <EntityNumber :value="data.orderNumber" />
      </template>

      <n-space
        vertical
        :size="20"
      >
        <HistoryItemDishes :data="data" />
        <HistoryItemCustomer :data="data" />

        <div :style="{ textAlign: 'center' }">
          <n-text depth="3">
            Created {{ formatDate(data.createdAt) }}
          </n-text>
        </div>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import {
  NText,
  NDrawer,
  NDrawerContent,
  NSpace,
} from 'naive-ui';

import HistoryItemCustomer from './HistoryItemCustomer.vue';
import HistoryItemDishes from './HistoryItemDishes.vue';

defineProps<{ data: IOrder | null }>();

const { checkMobileScreen } = useResponsive();
</script>
