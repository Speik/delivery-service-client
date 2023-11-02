<template>
  <n-card
    embedded
    title="Customer"
  >
    <template #header-extra>
      <n-tag :bordered="false">
        <template #icon>
          <n-icon :component="PhoneIcon" />
        </template>

        +{{ data.phone }}
      </n-tag>
    </template>

    <n-space vertical>
      <div :style="{ display: 'flex', alignItems: 'flex-start' }">
        <n-icon
          :component="CustomerIcon"
          :size="20"
        />

        <span :style="{ marginLeft: '.5rem' }">
          {{ data.name }}
        </span>
      </div>

      <div
        v-if="data.orderType === OrderType.DELIVERY"
        :style="{ display: 'flex', alignItems: 'flex-start' }"
      >
        <n-icon
          :component="AddressIcon"
          :size="20"
        />

        <span :style="{ marginLeft: '.5rem' }">
          {{ data.address }}
        </span>
      </div>

      <div
        v-if="data.comment"
        :style="{ display: 'flex', alignItems: 'flex-start' }"
      >
        <n-icon
          :component="CommentIcon"
          :size="20"
        />

        <span :style="{ marginLeft: '.5rem' }">
          {{ data.comment }}
        </span>
      </div>
    </n-space>

    <template #footer>
      <n-space>
        <OrderTypeTag :value="data.orderType" />
        <PaymentMethodTag :value="data.paymentMethod" />
      </n-space>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NSpace,
  NIcon,
  NTag,
} from 'naive-ui';

import {
  User as CustomerIcon,
  Phone as PhoneIcon,
  Location as AddressIcon,
  Chat as CommentIcon,
} from '@vicons/carbon';

import { OrderType, OrderValues } from '~/declarations';

defineProps<{ data: OrderValues }>();
</script>
