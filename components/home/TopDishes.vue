<template>
  <div
    :style="{
      padding: '3rem 0',
      paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
      paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
      boxSizing: 'border-box',
    }"
  >
    <div
      :style="{
        paddingBottom: '3rem',
        textAlign: 'center',
        fontSize: '1.5rem',
      }"
    >
      Top dishes
    </div>

    <n-grid
      :cols="calc`1 s:1 m:3 l:3 xl:3 2xl:3`"
      x-gap="64"
      y-gap="64"
      responsive="screen"
    >
      <n-gi
        v-for="dish in topDishes as IDish[]"
        :key="dish.id"
      >
        <n-card
          :title="dish.name"
          embedded
        >
          <template #cover>
            <n-image
              lazy
              preview-disabled
              object-fit="cover"
              :src="resolveResourceUrl('image', dish.image)"
              :alt="dish.name"
              :style="{ height: '256px', width: '100%' }"
            />
          </template>

          <template #header-extra>
            {{ formatPrice(dish.price) }}
          </template>

          <n-ellipsis
            :line-clamp="3"
            :tooltip="false"
          >
            <n-text :depth="dish.description ? 1 : 3">
              {{ dish.description ?? 'No description' }}
            </n-text>
          </n-ellipsis>

          <template #footer>
            <n-space justify="space-between">
              <n-tag :bordered="false">
                <template #icon>
                  <n-icon :component="TagIcon" />
                </template>
                {{ dish.category?.name ?? 'Unknown' }}
              </n-tag>

              <NuxtLink
                to="/menu"
                :style="{ textDecoration: 'none' }"
              >
                <n-button
                  text
                  type="success"
                  icon-placement="right"
                >
                  <template #icon>
                    <n-icon :component="ArrowIcon" />
                  </template>

                  Order
                </n-button>
              </NuxtLink>
            </n-space>
          </template>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import {
  NGrid,
  NGi,
  NCard,
  NImage,
  NTag,
  NIcon,
  NText,
  NSpace,
  NButton,
  NEllipsis,
} from 'naive-ui';

import {
  Tag as TagIcon,
  ChevronRight as ArrowIcon,
} from '@vicons/carbon';
import { resolveResourceUrl } from '~/utils';

const MAX_TOP_DISHES_COUNT = 3;

const { calc } = useResponsive();
const config = useRuntimeConfig();

const { data: topDishes } = await useFetch<IDish[]>('/api/v1/dishes/top', {
  method: 'GET',
  query: { count: MAX_TOP_DISHES_COUNT },
  baseURL: config.public.apiBaseUrl,
});
</script>
