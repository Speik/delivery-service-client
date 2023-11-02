<template>
  <n-spin :show="isLoading">
    <n-thing
      v-show="checkMobileScreen()"
      :style="{ marginBottom: '1.5rem' }"
    >
      <template #avatar>
        <n-avatar
          round
          :color="themeVars.primaryColor"
          :style="{ fontSize: '1.15rem' }"
        >
          4
        </n-avatar>
      </template>

      <template #header>
        <div :style="{ fontSize: '1.25rem' }">
          Checkout
        </div>
      </template>
    </n-thing>

    <n-space vertical>
      <CheckoutStepCustomer :data="orderValues" />
      <CheckoutStepDishes />

      <n-space justify="space-between">
        <n-button
          secondary
          @click="emit('clickBack')"
        >
          <template #icon>
            <n-icon :component="BackIcon" />
          </template>

          Back
        </n-button>

        <n-button
          type="primary"
          @click="onConfirmClick"
        >
          Confirm Order
        </n-button>
      </n-space>
    </n-space>
  </n-spin>
</template>

<script setup lang="ts">
import {
  NButton,
  NSpace,
  NIcon,
  NSpin,
  NThing,
  NAvatar,
  useThemeVars,
  useMessage,
} from 'naive-ui';

import { ChevronLeft as BackIcon } from '@vicons/carbon';

import CheckoutStepCustomer from './CheckoutStepCustomer.vue';
import CheckoutStepDishes from './CheckoutStepDishes.vue';

import { OrderType, OrderValues } from '~/declarations';
import { useOrdersHistoryStore } from '~/stores';

type CreatedOrder = IOrder & {
  createdAt: string;
  updatedAt: string;
}

const props = defineProps<{ orderValues: OrderValues }>();
const emit = defineEmits(['clickBack']);

const { checkMobileScreen } = useResponsive();
const { cartStore } = useCart();
const ordersHistoryStore = useOrdersHistoryStore();
const router = useRouter();
const themeVars = useThemeVars();
const messageController = useMessage();
const config = useRuntimeConfig();

const isLoading = ref(false);

const createOrder = async () => {
  const dishesIds = cartStore.getPlain().map(dish => dish.id);

  const isDelivery = props.orderValues.orderType === OrderType.DELIVERY;
  const address = props.orderValues.address;
  const comment = props.orderValues.comment;

  const { data, error } = await useFetch<CreatedOrder>('/api/v1/orders', {
    method: 'POST',
    body: {
      customer: {
        phone: props.orderValues.phone,
        name: props.orderValues.name,
        paymentMethod: props.orderValues.paymentMethod,
        orderType: props.orderValues.orderType,
        ...(isDelivery && address && { address }),
      },
      dishes: dishesIds,
      ...(comment && { comment }),
    },
    baseURL: config.public.apiBaseUrl,
  });

  if (error.value) {
    const errorData = error.value.data;

    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message.shift()
      : errorData.message;

    messageController.error(`Error: ${errorMessage}`, {
      keepAliveOnHover: true,
      closable: true,
    });

    throw new Error('Could not create order');
  }

  const order: IOrder = data.value!;

  order.createdAt = parseLocalDate(data.value!.createdAt);
  order.updatedAt = parseLocalDate(data.value!.updatedAt);

  return order;
};

const onConfirmClick = async () => {
  if (cartStore.getSize() === 0) {
    throw new Error('Items for order were not selected');
  }

  isLoading.value = true;

  try {
    const order = await createOrder();
    ordersHistoryStore.saveOrder(order);
  } finally {
    isLoading.value = false;
  }

  cartStore.clear();
  router.push('/orders/my');
};
</script>
