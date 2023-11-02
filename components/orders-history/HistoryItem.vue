<template>
  <n-thing
    content-indented
    :style="{
      padding: '1rem',
      display: 'flex',
      backgroundColor: '#fafafc',
      borderRadius: '5px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: themeVars.dividerColor,
      cursor: 'pointer',
      boxShadow: themeVars.boxShadow1,
    }"
  >
    <template #avatar>
      <n-avatar
        circle
        :style="{ marginRight: '1rem' }"
        :color="themeVars.primaryColor"
      >
        <n-icon
          :component="orderIcon"
          size="20"
        />
      </n-avatar>
    </template>

    <template #header>
      <EntityNumber :value="data.orderNumber" />
    </template>

    <template #header-extra>
      {{ formatPrice(data.price) }}
    </template>

    <template #description>
      <OrderStatusTag
        :value="data.status"
      />
    </template>

    <template #footer>
      <n-space>
        <PaymentMethodTag :value="data.paymentMethod" />
        <OrderTypeTag :value="data.type" />
      </n-space>
    </template>

    <template #action>
      <n-text :depth="3">
        {{ formatDate(data.createdAt) }}
      </n-text>
    </template>
  </n-thing>
</template>

<script setup lang="ts">
import {
  NThing,
  NAvatar,
  NIcon,
  NSpace,
  NText,
  useThemeVars,
} from 'naive-ui';

import {
  Building as TakeawayIcon,
  DeliveryParcel as DeliveryIcon,
  Query as UnknownIcon,
} from '@vicons/carbon';

import { OrderType } from '~/declarations';

const props = defineProps<{ data: IOrder }>();
const themeVars = useThemeVars();

const orderIcon = computed(() => {
  if (props.data.type === OrderType.DELIVERY) {
    return DeliveryIcon;
  }

  if (props.data.type === OrderType.TAKEAWAY) {
    return TakeawayIcon;
  }

  return UnknownIcon;
});
</script>
