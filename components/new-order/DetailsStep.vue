<template>
  <n-spin :show="isLoading">
    <n-space vertical>
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
            2
          </n-avatar>
        </template>

        <template #header>
          <div :style="{ fontSize: '1.25rem' }">
            Details
          </div>
        </template>
      </n-thing>

      <n-form
        ref="form"
        :model="formValues"
        :rules="rules"
      >
        <n-space vertical>
          <n-form-item
            path="name"
            label="Name"
            size="large"
          >
            <n-input
              v-model:value.trim="formValues.name"
              autofocus
              clearable
              show-count
              :maxlength="128"
              placeholder="What's your name?"
            />
          </n-form-item>

          <n-space
            :vertical="checkMobileScreen()"
            justify="space-between"
          >
            <n-form-item
              path="paymentMethod"
              label="Payment Method"
              size="large"
            >
              <n-radio-group
                v-model:value="formValues.paymentMethod"
                name="paymentMethodRadio"
              >
                <n-radio-button
                  v-for="value in paymentMethodRadioValues"
                  :key="value.method"
                  :value="value.method"
                  :label="value.label"
                />
              </n-radio-group>
            </n-form-item>

            <n-form-item
              path="orderType"
              label="Order Type"
              size="large"
            >
              <n-radio-group
                v-model:value="formValues.orderType"
                name="orderTypeRadio"
              >
                <n-radio-button
                  v-for="value in orderTypeRadioValues"
                  :key="value.type"
                  :value="value.type"
                  :label="value.label"
                />
              </n-radio-group>
            </n-form-item>
          </n-space>

          <n-form-item
            v-if="isDeliverySelected"
            path="address"
            label="Address"
            size="large"
          >
            <n-input
              v-model:value.trim="formValues.address"
              autofocus
              clearable
              show-count
              :maxlength="512"
              placeholder="Where to delivery?"
            />
          </n-form-item>
        </n-space>
      </n-form>

      <n-space
        justify="space-between"
        :style="{ marginBottom: '1.5rem' }"
      >
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
          icon-placement="right"
          type="primary"
          secondary
          @click="onClickForward"
        >
          <template #icon>
            <n-icon :component="ProceedIcon" />
          </template>

          Proceed
        </n-button>
      </n-space>
    </n-space>
  </n-spin>
</template>

<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadioButton,
  NSpace,
  NButton,
  NIcon,
  NSpin,
  NThing,
  NAvatar,
  FormRules,
  FormItemRule,
  FormInst,
  FormValidationError,
  useThemeVars,
} from 'naive-ui';

import {
  ChevronLeft as BackIcon,
  ChevronRight as ProceedIcon,
} from '@vicons/carbon';

import { OrderValues, OrderType, PaymentMethod } from '~/declarations';

const props = defineProps<{ orderValues: Omit<OrderValues, 'comment'> }>();
const emit = defineEmits(['clickBack', 'clickForward']);

type FormValues = Omit<typeof props.orderValues, 'phone'>;

const themeVars = useThemeVars();
const { checkMobileScreen } = useResponsive();

const form = ref<FormInst | null>(null);
const formValues = reactive<FormValues>({
  name: props.orderValues.name,
  paymentMethod: props.orderValues.paymentMethod,
  orderType: props.orderValues.orderType,
  address: props.orderValues.address,
});

const isLoading = ref(false);

const isDeliverySelected = computed(() => {
  return formValues.orderType === OrderType.DELIVERY;
});

const rules: FormRules = {
  name: {
    required: true,
    trigger: ['input', 'blur'],
    validator (_: FormItemRule, value: string) {
      return Boolean(value) || new Error('Name is required');
    },
  },
  paymentMethod: {
    required: true,
    trigger: ['input', 'blur'],
    validator (_: FormItemRule, value: PaymentMethod | null) {
      return Boolean(value) || new Error('Payment method is required');
    },
  },
  orderType: {
    required: true,
    trigger: ['input', 'blur'],
    validator (_: FormItemRule, value: OrderType | null) {
      return Boolean(value) || new Error('Order type is required');
    },
  },
  address: {
    required: true,
    trigger: ['input', 'blur'],
    validator (_: FormItemRule, value: string) {
      if (!isDeliverySelected) return true;
      return Boolean(value) || new Error('Address is required');
    },
  },
};

const orderTypeRadioValues = [
  { type: OrderType.DELIVERY, label: 'Delivery' },
  { type: OrderType.TAKEAWAY, label: 'Takeaway' },
];

const paymentMethodRadioValues = [
  { method: PaymentMethod.BANK_CARD, label: 'Bank card' },
  { method: PaymentMethod.CASH, label: 'Cash' },
];

const setCustomerData = async () => {
  const config = useRuntimeConfig();
  const phone = props.orderValues.phone;

  const { data } = await useFetch<ICustomer>(`/api/v1/customers/${phone}`, {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
  });

  if (!data.value) {
    return;
  }

  formValues.name = data.value.name;
  formValues.paymentMethod = data.value.preferredPayment;
  formValues.orderType = data.value.preferredOrder;
  formValues.address = data.value.address ?? '';
};

const onClickForward = () => {
  if (!form.value) return;

  form.value.validate((errors?: FormValidationError[]) => {
    if (errors?.length) return;

    emit('clickForward', {
      name: formValues.name,
      paymentMethod: formValues.paymentMethod,
      orderType: formValues.orderType,
      address: formValues.address,
    });
  });
};

onMounted(async () => {
  isLoading.value = true;

  try {
    await setCustomerData();
  } finally {
    isLoading.value = false;
  }
});
</script>
