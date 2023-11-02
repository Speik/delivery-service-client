type SearchParams = {
  term: string;
  categoryId: string | null;
}

export const useDishesStore = defineStore('dishes', () => {
  const config = useRuntimeConfig();
  const dishes = ref<IDish[]>([]);

  const fetchData = async () => {
    const { data } = await useFetch<IDish[]>('/api/v1/dishes', {
      method: 'GET',
      query: { offset: 0, limit: 9999 },
      baseURL: config.public.apiBaseUrl,
    });

    dishes.value = data.value ?? [];
  };

  const searchDishes = async ({ term, categoryId }: SearchParams) => {
    const queryParams: Record<string, string> = {};

    if (term) queryParams.term = term;
    if (categoryId) queryParams.categoryId = categoryId;

    const { data } = await useFetch<IDish[]>('/api/v1/dishes/search', {
      method: 'GET',
      query: queryParams,
      baseURL: config.public.apiBaseUrl,
    });

    dishes.value = data.value ?? [];
  };

  return { dishes, fetchData, searchDishes };
});
