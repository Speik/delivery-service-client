<template>
  <slot />
</template>

<script setup lang="ts">
import {
  NAlert,
  NSpace,
  MessageRenderMessage,
  SpaceProps,
  useThemeVars,
  useMessage,
} from 'naive-ui';

import EntityNumber from './EntityNumber.vue';
import OrderStatusTag from './OrderStatusTag.vue';

import { OrderStatus } from '~/declarations';
import { useOrdersHistoryStore } from '~/stores';

type StatusChangePayload = Pick<IOrder, 'id' | 'status' | 'orderNumber'>;

const STATUS_CHANGE_EVENT = 'STATUS_CHANGE';
const NOTIFICATION_DURATION = 10_000;

const themeVars = useThemeVars();
const messageController = useMessage();
const sockets = useSockets('/orders');
const ordersHistoryStore = useOrdersHistoryStore();
const { calc } = useResponsive();

const statusColors = new Map<OrderStatus, string>([
  [OrderStatus.CREATED, themeVars.value.textColor3],
  [OrderStatus.CONFIRMED, themeVars.value.infoColor],
  [OrderStatus.COOKING, themeVars.value.successColorSuppl],
  [OrderStatus.DELIVERING, themeVars.value.successColorPressed],
  [OrderStatus.WAITING, themeVars.value.successColorPressed],
  [OrderStatus.COMPLETED, '#6c00e7'],
  [OrderStatus.CANCELLED, themeVars.value.errorColor],
]);

/**
 * Note that this message render function using Alert
 * as display component instead of native NaiveUI message
 *
 * Read more:
 * https://www.naiveui.com/en-US/os-theme/components/message#customize-message.vue
 */
const getNotificationRenderer = (
  { status, orderNumber }: StatusChangePayload
): MessageRenderMessage => {
  return props => {
    const spaceProps: SpaceProps = { align: 'center', size: 4 };

    const alertProps = {
      /**
       * @throws TypeScriptError when type is
       * 'info' despite it is correct value
       */
      type: 'info' as any,
      closable: props.closable,
      bordered: false,
      showIcon: false,
      style: {
        backgroundColor: themeVars.value.baseColor,
        boxShadow: themeVars.value.boxShadow3,
        borderRadius: '5px',
        width: calc`292px s:292px m:360px l:480px xl:480px 2xl:480px`,
        borderLeft: `5px solid ${statusColors.get(status)}`,
      },
    };

    return h(NAlert, alertProps, {
      header: () => {
        return h(NSpace, spaceProps, () => [
          h('div', 'Order'),
          h(EntityNumber, { value: orderNumber })
        ]);
      },
      default: () => {
        return h(NSpace, spaceProps, () => [
          h('div', 'Status changed to'),
          h(OrderStatusTag, { value: status })
        ]);
      },
    });
  };
};

const handleStatusChange = (payload: StatusChangePayload) => {
  const targetOrder = ordersHistoryStore.getOrder(payload.id);
  if (!targetOrder) return;

  ordersHistoryStore.updateStatus(targetOrder, payload.status);

  messageController.info('', {
    render: getNotificationRenderer(payload),
    duration: NOTIFICATION_DURATION,
    closable: true,
  });
};

onMounted(() => {
  sockets.on(STATUS_CHANGE_EVENT, handleStatusChange);
});
</script>
