<template>
  <n-card
    embedded
    title="Dishes"
  >
    <template #header-extra>
      <n-h4 :style="{ margin: 0 }">
        {{ formatPrice(data.price) }}
      </n-h4>
    </template>

    <n-list :style="{ backgroundColor: 'transparent' }">
      <n-list-item
        v-for="dish in dishesList"
        :key="dish.id"
      >
        <template #prefix>
          <n-avatar
            :src="resolveResourceUrl('avatar', dish.image)"
            lazy
          />
        </template>

        <div
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }"
        >
          <n-space :size="8">
            <n-text strong>
              {{ formatDishCount(dish.count) }}
            </n-text>

            <n-text strong>
              {{ dish.name }}
            </n-text>
          </n-space>

          <n-text
            depth="3"
            :style="{ flex: '0 0 auto', marginLeft: '.5rem' }"
          >
            {{ formatPrice(dish.totalPrice) }}
          </n-text>
        </div>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NSpace,
  NList,
  NListItem,
  NAvatar,
  NText,
  NH4,
} from 'naive-ui';

type CountedDish = IDish & {
  count: number;
  totalPrice: number;
}

const props = defineProps<{ data: IOrder }>();

const dishesList = computed(() => {
  const dishes = props.data.dishes;

  return dishes.reduce<CountedDish[]>((result, dish) => {
    const targetDish = result.find(item => item.id === dish.id);

    if (!targetDish) {
      result.push({
        ...dish,
        count: 1,
        totalPrice: Number(dish.price),
      });

      return result;
    }

    targetDish.count += 1;
    targetDish.totalPrice += Number(dish.price);

    return result;
  }, []);
});

const formatDishCount = (value: number) => {
  return `x${value}`;
};
</script>
