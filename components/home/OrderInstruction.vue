<template>
  <div
    :style="{
      padding: '3rem 0',
      paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
      paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
      boxSizing: 'border-box',
      ...borderStyles,
      borderLeft: 0,
      borderRight: 0,
      borderBottom: 0,
    }"
  >
    <div
      :style="{
        paddingBottom: '3rem',
        textAlign: 'center',
        fontSize: '1.5rem',
      }"
    >
      How to order?
    </div>

    <n-grid
      :cols="isGridVertical ? 1 : 22"
      x-gap="8"
    >
      <n-gi
        v-for="meta in instructionMeta"
        :key="meta.key"
        :span="meta.key === 'arrow' ? 2 : 6"
        :style="{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          ...(meta.key !== 'arrow' && borderStyles),
          borderRadius: meta.shape,
        }"
      >
        <n-icon
          v-if="meta.key === 'arrow'"
          size="40"
          :component="isGridVertical ? ArrowDownIcon : ArrowRightIcon"
          :color="themeVars.primaryColorSuppl"
        />

        <n-icon
          v-if="meta.key !== 'arrow'"
          size="40"
          :component="meta.icon"
          :color="themeVars.primaryColorSuppl"
        />

        <div
          v-if="meta.key !== 'arrow'"
          :style="{ padding: '1rem 0', fontSize: '1.3rem' }"
        >
          {{ meta.label }}
        </div>

        <div
          v-if="meta.key !== 'arrow'"
          :style="{ paddingBottom: '1rem' }"
        >
          <n-text depth="3">
            {{ meta.description }}
          </n-text>
        </div>

        <div
          v-if="meta.key !== 'arrow'"
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2rem',
            height: '2rem',
            color: themeVars.primaryColor,
            backgroundColor: '#d9f0e4',
            borderRadius: '100%',
            fontSize: '1.25rem',
          }"
        >
          {{ meta.step }}
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { NGrid, NGi, NIcon, NText, useThemeVars } from 'naive-ui';
import { CSSProperties } from 'nuxt/dist/app/compat/capi';

import {
  ShoppingCartPlus as AddItemsIcon,
  LicenseDraft as FillFormIcon,
  Headset as AwaitConfirmationIcon,
  ChevronRight as ArrowRightIcon,
  ChevronDown as ArrowDownIcon,
} from '@vicons/carbon';

const themeVars = useThemeVars();
const { calc, checkMobileScreen, checkTabletScreen } = useResponsive();

const borderStyles: CSSProperties = {
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: themeVars.value.dividerColor,
  borderRadius: '5px',
};

const isGridVertical = computed(() => {
  return checkMobileScreen() || checkTabletScreen();
});

const instructionMeta = computed(() => {
  return [
    {
      key: 'addItems',
      label: 'Add items to cart',
      icon: AddItemsIcon,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
      shape: '30% 70% 70% 30% / 30% 30% 70% 70%',
      step: 1,
    },
    { key: 'arrow' },
    {
      key: 'fillForm',
      label: 'Fill out the order form',
      icon: FillFormIcon,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
      shape: '72% 28% 42% 58% / 50% 62% 38% 50%',
      step: 2,
    },
    { key: 'arrow' },
    {
      key: 'awaitConfirmation',
      label: 'Wait for the manager\'s call',
      icon: AwaitConfirmationIcon,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
      shape: '54% 46% 32% 68% / 37% 51% 49% 63%',
      step: 3,
    },
  ];
});
</script>
