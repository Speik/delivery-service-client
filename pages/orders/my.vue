<template>
  <div>
    <h1
      :style="{
        margin: 0,
        paddingBottom: '1.5rem',
        fontSize: '2rem',
        fontWeight: '400',
      }"
    >
      My Orders
    </h1>

    <n-empty
      v-if="!ordersHistoryStore.ordersHistory.length"
      description="No orders found"
      size="huge"
      :style="{ flex: '1 1 auto' }"
    />

    <n-grid
      v-else
      cols="1 s:2 m:2 l:3 xl:3 2xl:3"
      x-gap="32"
      y-gap="32"
      responsive="screen"
    >
      <n-gi
        v-for="order in ordersHistoryStore.ordersHistory"
        :key="getOrderKey(order)"
        @click="onOrderClick(order)"
      >
        <HistoryItem :data="order" />
      </n-gi>
    </n-grid>

    <HistoryItemDetails
      v-model:show="isDetailsShown"
      :data="detailsData"
    />
  </div>
</template>

<script setup lang="ts">
import { NEmpty, NGrid, NGi } from 'naive-ui';
import { useOrdersHistoryStore } from '~/stores';

import HistoryItem from '~/components/orders-history/HistoryItem.vue';
import HistoryItemDetails from '~/components/orders-history/HistoryItemDetails.vue';

useHead({ title: 'My Orders' });

const ordersHistoryStore = useOrdersHistoryStore();
const detailsData = ref<IOrder | null>(null);
const isDetailsShown = ref(false);

const getOrderKey = (order: IOrder) => {
  return `${order.id}-${order.status}`;
};

const fetchData = () => {
  ordersHistoryStore.init();
};

const onOrderClick = (data: IOrder) => {
  detailsData.value = data;
  isDetailsShown.value = true;
};

onMounted(fetchData);
</script>
