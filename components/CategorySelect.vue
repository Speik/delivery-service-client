<template>
  <n-select
    v-bind="$attrs"
    placeholder="Select category"
    :options="categories"
    :loading="isLoading"
    :reset-menu-on-options-change="false"
    :consistent-menu-width="false"
    @focus="handleFocus"
    @scroll="handleScroll"
  />
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui';
import { SelectMixedOption } from 'naive-ui/es/select/src/interface';

const LIST_SIZE = 10;

const isLoading = ref(false);
const categories = ref<SelectMixedOption[]>([]);

const currentPage = ref(1);
const currentOffset = computed(() => {
  return (currentPage.value - 1) * LIST_SIZE;
});

const buildOptions = (categories: ICategory[]) => {
  return categories.map<SelectMixedOption>(category => {
    return {
      key: category.id,
      value: category.id,
      label: category.name,
    };
  });
};

const getCategories = async () => {
  const config = useRuntimeConfig();

  const { data } = await useFetch<ICategory[]>('/api/v1/categories', {
    method: 'GET',
    query: { offset: currentOffset.value, limit: LIST_SIZE },
    baseURL: config.public.apiBaseUrl,
  });

  return data.value ?? [];
};

const handleFocus = async () => {
  // Do nothing in case of categories already loaded
  if (categories.value.length) return;

  isLoading.value = true;

  const data = await getCategories();
  categories.value = buildOptions(data);

  isLoading.value = false;
};

const handleScroll = async (e: Event) => {
  const CONTENT_SCROLL_RATIO = 64;

  if (isLoading.value) {
    return;
  }

  const currentTarget = e.currentTarget as HTMLElement;

  const isFullyScrolled = (
    currentTarget.scrollTop + currentTarget.offsetHeight >=
    currentTarget.scrollHeight - CONTENT_SCROLL_RATIO
  );

  if (!isFullyScrolled) {
    return;
  }

  currentPage.value += 1;
  isLoading.value = true;

  const data = await getCategories();
  const categoriesOptions = buildOptions(data);

  categories.value.push(...categoriesOptions);
  isLoading.value = false;
};
</script>
