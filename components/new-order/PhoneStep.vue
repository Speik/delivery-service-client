<template>
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
          1
        </n-avatar>
      </template>

      <template #header>
        <div :style="{ fontSize: '1.25rem' }">
          Phone
        </div>
      </template>
    </n-thing>

    <n-form
      ref="form"
      :model="formValues"
      :rules="rules"
    >
      <n-form-item
        path="phone"
        label="Phone"
        size="large"
      >
        <n-input
          v-model:value.trim="formValues.phone"
          autofocus
          clearable
          placeholder="Only numbers allowed"
          :allow-input="validatePhoneNumber"
          :input-props="{ inputmode: 'numeric' }"
        />
      </n-form-item>
    </n-form>

    <n-space justify="space-between">
      <n-button
        disabled
        secondary
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
</template>

<script setup lang="ts">
import {
  FormItemRule,
  FormRules,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  NButton,
  NIcon,
  NThing,
  NAvatar,
  FormInst,
  FormValidationError,
  useThemeVars,
} from 'naive-ui';

import {
  ChevronLeft as BackIcon,
  ChevronRight as ProceedIcon,
} from '@vicons/carbon';

import { OrderValues } from '~/declarations';

const props = defineProps<{ orderValues: Pick<OrderValues, 'phone'> }>();
const emit = defineEmits(['clickForward']);

const themeVars = useThemeVars();
const { checkMobileScreen } = useResponsive();

const form = ref<FormInst | null>(null);
const formValues = reactive<typeof props.orderValues>({
  phone: props.orderValues.phone,
});

const rules: FormRules = {
  phone: {
    required: true,
    trigger: ['input', 'blur'],
    validator (_: FormItemRule, value: string) {
      return Boolean(value) || new Error('Phone is required');
    },
  }
};

const onClickForward = () => {
  if (!form.value) return;

  form.value.validate((errors?: FormValidationError[]) => {
    if (errors?.length) return;

    emit('clickForward', {
      phone: formValues.phone,
    });
  });
};

const validatePhoneNumber = (value: string) => {
  if (!value) return true;
  return /^\d+$/.test(value);
};
</script>
