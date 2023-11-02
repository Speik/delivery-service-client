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
      Menu
    </h1>

    <n-space
      :style="{ marginBottom: '2rem' }"
      :vertical="checkSmallScreen()"
      :justify="screenSize === 's' ? 'space-between': 'start'"
      :item-style="{ width: calc`100% s:48.5% m:30% l:25% xl:25% 2xl:25%` }"
    >
      <n-input
        v-model:value.trim.lazy="searchValues.term"
        placeholder="Search"
        size="large"
        clearable
        :input-props="{ inputmode: 'search' }"
      >
        <template #suffix>
          <n-button text>
            <n-icon
              :component="SearchIcon"
              :color="themeVars.primaryColorHover"
            />
          </n-button>
        </template>
      </n-input>

      <CategorySelect
        v-model:value="searchValues.categoryId"
        clearable
        size="large"
      />
    </n-space>

    <n-empty
      v-if="!dishesStore.dishes.length"
      description="No dishes found"
      size="huge"
      :style="{ flex: '1 1 auto' }"
    />

    <n-grid
      v-else
      :key="screenSize"
      cols="1 s:2 m:3 l:4"
      x-gap="32"
      y-gap="32"
      responsive="screen"
    >
      <n-gi
        v-for="dish in dishesStore.dishes"
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

          <n-text :depth="dish.description ? 1 : 3">
            <n-ellipsis
              v-if="dish.description"
              :line-clamp="2"
            >
              {{ dish.description }}

              <template #tooltip>
                <div :style="{ maxWidth: '256px' }">
                  {{ dish.description }}
                </div>
              </template>
            </n-ellipsis>

            <div
              v-else
              :style="{ paddingBottom: '.35rem' }"
            >
              No description <br>
              &nbsp;
            </div>
          </n-text>

          <template #footer>
            <n-space
              justify="space-between"
              align="center"
            >
              <n-tag :bordered="false">
                <template #icon>
                  <n-icon :component="TagIcon" />
                </template>
                {{ dish.category?.name ?? 'Unknown' }}
              </n-tag>

              <n-button
                v-if="!cartStore.getItem(dish)"
                type="primary"
                size="large"
                @click="cartStore.addItem(dish)"
              >
                Order
              </n-button>

              <div
                v-else
                :style="{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: themeVars.railColor,
                  borderRadius: '5px',
                }"
              >
                <n-button
                  text
                  :focusable="false"
                  :style="{ padding: '.75rem' }"
                  @click="cartStore.removeItem(dish)"
                >
                  -
                </n-button>

                {{ cartStore.getItem(dish)?.count ?? 0 }}

                <n-button
                  text
                  :focusable="false"
                  :style="{ padding: '0 .75rem' }"
                  @click="cartStore.addItem(dish)"
                >
                  +
                </n-button>
              </div>
            </n-space>
          </template>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import {
  NInput,
  NButton,
  NIcon,
  NSpace,
  NGrid,
  NGi,
  NCard,
  NImage,
  NTag,
  NEllipsis,
  NText,
  NEmpty,
  useThemeVars,
} from 'naive-ui';

import {
  Search as SearchIcon,
  Tag as TagIcon,
} from '@vicons/carbon';

import { useDishesStore } from '~/stores';
import { resolveResourceUrl } from '~/utils';

type SearchValues = {
  term: string;
  categoryId: string | null;
}

useHead({ title: 'Menu' });

const { cartStore } = useCart();
const { screenSize, calc, checkSmallScreen } = useResponsive();

const themeVars = useThemeVars();
const dishesStore = useDishesStore();

const searchValues = reactive<SearchValues>({
  term: '',
  categoryId: null,
});

const onSearchChange = async () => {
  if (!searchValues.term && !searchValues.categoryId) {
    await dishesStore.fetchData();
    return;
  }

  await dishesStore.searchDishes(searchValues);
};

watch(searchValues, onSearchChange);

dishesStore.fetchData();
</script>
