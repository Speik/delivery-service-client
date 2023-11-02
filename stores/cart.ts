type CartMeta = {
  count: number;
  data: IDish;
};

const LOCAL_STORAGE_KEY = 'cartData';

export const useCartStore = defineStore('cart', () => {
  const items = ref<Map<string, CartMeta>>(new Map());

  const dump = () => {
    const cartEntries = [...items.value.entries()];

    localStorage.setItem(
      LOCAL_STORAGE_KEY, JSON.stringify(cartEntries)
    );
  };

  const init = () => {
    const cartJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!cartJson) return;

    const data = JSON.parse(cartJson) as [string, CartMeta][];
    items.value = new Map(data);
  };

  const getItem = (dish: IDish) => {
    return items.value.get(dish.id);
  };

  const getPlain = (): IDish[] => {
    const values = [...items.value.values()];

    return values.reduce<IDish[]>((result, meta) => {
      const dishes = Array.from({ length: meta.count }, () => {
        return meta.data;
      });

      result.push(...dishes);
      return result;
    }, []);
  };

  const addItem = (dish: IDish) => {
    const targetItem = getItem(dish);

    if (targetItem) {
      targetItem.count += 1;
      return;
    }

    items.value.set(dish.id, {
      count: 1,
      data: dish,
    });
  };

  const removeItem = (dish: IDish) => {
    const targetItem = getItem(dish);
    if (!targetItem) return;

    if (targetItem.count === 1) {
      items.value.delete(dish.id);
      return;
    }

    targetItem.count -= 1;
  };

  const clearItem = (dish: IDish) => {
    items.value.delete(dish.id);
  };

  const getItemTotal = (dish: IDish) => {
    const targetItem = getItem(dish);
    if (!targetItem) return 0;

    return targetItem.count * Number(targetItem.data.price);
  };

  const getWorth = () => {
    const values = [...items.value.values()];

    return values.reduce((result, { data }) => {
      return result + getItemTotal(data);
    }, 0);
  };

  const getSize = () => {
    const values = [...items.value.values()];

    return values.reduce((result, { count }) => {
      return result + count;
    }, 0);
  };

  const clear = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    items.value.clear();
  };

  return {
    items,
    dump,
    init,
    getItem,
    getPlain,
    addItem,
    removeItem,
    clearItem,
    getItemTotal,
    getWorth,
    getSize,
    clear,
  };
});
