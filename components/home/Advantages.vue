<template>
  <n-grid
    cols="1 s:2 m:2 l:2 xl:4 2xl:4"
    x-gap="64"
    y-gap="64"
    responsive="screen"
    :style="{
      padding: '6rem 0',
      paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
      paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
      boxSizing: 'border-box',
    }"
  >
    <n-gi
      v-for="meta in advantagesMeta"
      :key="meta.key"
      :style="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }"
    >
      <n-icon
        size="40"
        :color="themeVars.primaryColorSuppl"
        :component="meta.icon"
      />

      <h2
        :style="{
          margin: 0,
          fontSize: '1.3rem',
          fontWeight: '400',
        }"
      >
        {{ meta.label }}
      </h2>

      <div
        :style="{
          margin: '.5rem 0',
          height: '3px',
          width: '48px',
          backgroundColor: themeVars.primaryColorSuppl,
          borderRadius: '3px',
        }"
      />

      <n-text depth="3">
        {{ meta.description }}
      </n-text>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { NGrid, NGi, NIcon, NText, useThemeVars } from 'naive-ui';

import {
  Delivery as DeliveryIcon,
  Wheat as ProductsIcon,
  Badge as ChefsIcon,
  ServiceDesk as DishesIcon,
} from '@vicons/carbon';

const themeVars = useThemeVars();
const { calc } = useResponsive();

const advantagesMeta = computed(() => {
  return [
    {
      key: 'delivery',
      label: 'Fast Delivery',
      icon: DeliveryIcon,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
    },
    {
      key: 'products',
      label: 'Natural Products',
      icon: ProductsIcon,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
    },
    {
      key: 'chefs',
      label: 'Experienced Chefs',
      icon: ChefsIcon,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
    },
    {
      key: 'dishes',
      label: 'Variety of Dishes',
      icon: DishesIcon,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
    },
  ];
});
</script>
