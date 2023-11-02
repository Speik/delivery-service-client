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
          3
        </n-avatar>
      </template>

      <template #header>
        <div :style="{ fontSize: '1.25rem' }">
          Comment
        </div>
      </template>
    </n-thing>

    <n-form
      ref="form"
      :model="formValues"
    >
      <n-form-item label="Comment (Optional)">
        <n-input
          v-model:value.trim="formValues.comment"
          autofocus
          clearable
          show-count
          :maxlength="512"
          placeholder="Any allergies or additional preferences?"
          type="textarea"
          :autosize="{ minRows: 6 }"
        />
      </n-form-item>
    </n-form>

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
  NForm,
  NFormItem,
  NInput,
  NSpace,
  NButton,
  NIcon,
  NThing,
  NAvatar,
  FormInst,
  useThemeVars,
} from 'naive-ui';

import {
  ChevronLeft as BackIcon,
  ChevronRight as ProceedIcon,
} from '@vicons/carbon';

import { OrderValues } from '~/declarations';

const props = defineProps<{ orderValues: Pick<OrderValues, 'comment'> }>();
const emit = defineEmits(['clickBack', 'clickForward']);

const themeVars = useThemeVars();
const { checkMobileScreen } = useResponsive();

const form = ref<FormInst | null>(null);
const formValues = reactive<typeof props.orderValues>({
  comment: props.orderValues.comment,
});

const onClickForward = () => {
  if (!form.value) return;

  emit('clickForward', {
    comment: formValues.comment,
  });
};
</script>
