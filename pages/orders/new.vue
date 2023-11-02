<template>
  <div>
    <n-space vertical>
      <NuxtLink to="/menu">
        <n-button
          text
          type="primary"
        >
          <template #icon>
            <n-icon :component="CancelIcon" />
          </template>

          Back to menu
        </n-button>
      </NuxtLink>

      <h1
        :style="{
          margin: 0,
          fontSize: '2rem',
          fontWeight: '400',
        }"
      >
        New Order
      </h1>
    </n-space>

    <n-steps
      v-show="!checkMobileScreen()"
      :current="currentStep"
      :style="{ marginTop: '1.5rem'}"
    >
      <n-step title="Phone" />
      <n-step title="Details" />
      <n-step title="Comment" />
      <n-step title="Checkout" />
    </n-steps>

    <div
      :style="{
        position: 'relative',
        width: calc`100% s:100% m: 50% l:50% xl:50% 2xl:50%`,
        margin: '1.5rem auto',
        minHeight: '384px',
      }"
    >
      <Transition name="slide">
        <div
          v-if="currentStep === 1"
          :style="{ position: 'absolute', width: '100%', height: '100%' }"
        >
          <PhoneStep
            :order-values="orderValues"
            @click-forward="onPhoneStepComplete"
          />
        </div>

        <div
          v-else-if="currentStep === 2"
          :style="{ position: 'absolute', width: '100%', height: '100%' }"
        >
          <DetailsStep
            :order-values="orderValues"
            @click-back="moveBack"
            @click-forward="onDetailsStepComplete"
          />
        </div>

        <div
          v-else-if="currentStep === 3"
          :style="{ position: 'absolute', width: '100%', height: '100%' }"
        >
          <CommentStep
            :order-values="orderValues"
            @click-back="moveBack"
            @click-forward="onCommentStepComplete"
          />
        </div>

        <div v-else>
          <CheckoutStep
            :order-values="orderValues"
            @click-back="moveBack"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NSteps, NStep, NButton, NSpace, NIcon } from 'naive-ui';
import { ChevronLeft as CancelIcon } from '@vicons/carbon';

import { OrderValues } from '~/declarations';

import PhoneStep from '~/components/new-order/PhoneStep.vue';
import DetailsStep from '~/components/new-order/DetailsStep.vue';
import CommentStep from '~/components/new-order/CommentStep.vue';
import CheckoutStep from '~/components/new-order/CheckoutStep.vue';

definePageMeta({ layout: 'checkout' });
useHead({ title: 'New Order' });

type PhoneStepPayload = Pick<OrderValues, 'phone'>;
type DetailsStepPayload = Omit<OrderValues, 'phone' | 'comment'>;
type CommentStepPayload = Pick<OrderValues, 'comment'>;

const { checkMobileScreen, calc } = useResponsive();
const { cartStore } = useCart();

const orderValues = reactive<OrderValues>({
  phone: '',
  name: '',
  paymentMethod: null,
  orderType: null,
  address: '',
  comment: '',
});

const currentStep = ref(1);

const moveBack = () => {
  currentStep.value -= 1;
};

const moveForward = () => {
  currentStep.value += 1;
};

const onPhoneStepComplete = ({ phone }: PhoneStepPayload) => {
  orderValues.phone = phone;
  moveForward();
};

const onDetailsStepComplete = (payload: DetailsStepPayload) => {
  orderValues.name = payload.name;
  orderValues.paymentMethod = payload.paymentMethod;
  orderValues.orderType = payload.orderType;
  orderValues.address = payload.address;

  moveForward();
};

const onCommentStepComplete = ({ comment }: CommentStepPayload) => {
  orderValues.comment = comment;
  moveForward();
};

onBeforeMount(() => cartStore.init());
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(40%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-40%);
}
</style>
