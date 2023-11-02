const LOCAL_STORAGE_KEY = 'ordersData';

export const useOrdersHistoryStore = defineStore('ordersHistory', () => {
  const ordersHistory = ref<IOrder[]>([]);

  const init = () => {
    const ordersHistoryJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!ordersHistoryJson) return;

    const data = JSON.parse(ordersHistoryJson) as IOrder[];

    data.forEach(order => {
      order.createdAt = new Date(order.createdAt);
      order.updatedAt = new Date(order.updatedAt);
    });

    ordersHistory.value = data;
  };

  const saveOrder = (order: IOrder) => {
    const ordersJson = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!ordersJson) {
      const newData = [order];

      localStorage.setItem(
        LOCAL_STORAGE_KEY, JSON.stringify(newData)
      );

      return;
    }

    const orders = JSON.parse(ordersJson) as IOrder[];
    orders.unshift(order);

    localStorage.setItem(
      LOCAL_STORAGE_KEY, JSON.stringify(orders)
    );
  };

  const getOrder = (id: string) => {
    const ordersJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!ordersJson) return null;

    const orders = JSON.parse(ordersJson) as IOrder[];
    const targetOrder = orders.find(item => item.id === id);

    return targetOrder ?? null;
  };

  const updateStatus = (order: IOrder, status: OrderStatus) => {
    const ordersHistoryJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!ordersHistoryJson) return;

    const data = JSON.parse(ordersHistoryJson) as IOrder[];

    const storageOrder = data.find(item => item.id === order.id);
    if (!storageOrder) return;

    const loadedOrder = ordersHistory.value.find(item => item.id === order.id);
    if (!loadedOrder) return;

    storageOrder.status = status;
    loadedOrder.status = status;

    localStorage.setItem(
      LOCAL_STORAGE_KEY, JSON.stringify(data)
    );
  };

  return { ordersHistory, init, saveOrder, getOrder, updateStatus };
});
