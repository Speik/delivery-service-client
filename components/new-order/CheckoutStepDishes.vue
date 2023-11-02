<template>
  <n-card
    embedded
    title="Dishes"
  >
    <n-list :style="{ backgroundColor: 'transparent' }">
      <n-list-item
        v-for="[id, { count, data }] in cartStore.items.entries()"
        :key="id"
      >
        <template #prefix>
          <n-avatar
            :src="resolveResourceUrl('avatar', data.image)"
            lazy
          />
        </template>

        <div
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '.5rem',
          }"
        >
          <n-text strong>
            {{ formatDishCount(count) }}
            {{ data.name }}
          </n-text>

          <n-text
            depth="3"
            :style="{ flex: '0 0 auto', marginLeft: '.5rem' }"
          >
            {{ formatPrice(cartStore.getItemTotal(data)) }}
          </n-text>
        </div>
      </n-list-item>

      <n-list-item :style="{fontSize: '1.15rem'}">
        <n-text depth="2">
          Total:
        </n-text>

        <n-text strong>
          {{ formatPrice(cartStore.getWorth()) }}
        </n-text>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NList,
  NListItem,
  NAvatar,
  NText,
} from 'naive-ui';
import { resolveResourceUrl } from '~/utils';

const { cartStore } = useCart();

const formatDishCount = (value: number) => {
  return `x${value}`;
};
</script>
