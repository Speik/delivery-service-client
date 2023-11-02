<template>
  <n-drawer
    v-bind="$attrs"
    :width="checkMobileScreen() ? '100%' : 384"
    :z-index="999"
  >
    <n-drawer-content
      title="Cart"
      closable
    >
      <n-empty
        v-if="!cartStore.items.size"
        description="Empty"
        size="huge"
        :style="{ flex: '1 1 auto' }"
      />

      <n-list
        v-else
        :style="{ backgroundColor: 'transparent' }"
      >
        <n-list-item
          v-for="[id, { count, data }] in cartStore.items.entries()"
          :key="id"
        >
          <template #prefix>
            <n-avatar
              :src="resolveResourceUrl('avatar', data.image)"
              lazy
            />
          </template>

          <div
            :style="{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '.5rem',
            }"
          >
            <n-text strong>
              {{ data.name }}
            </n-text>

            <n-text
              depth="3"
              :style="{ flex: '0 0 auto', marginLeft: '.5rem' }"
            >
              {{ formatPrice(cartStore.getItemTotal(data)) }}
            </n-text>
          </div>

          <n-space justify="space-between">
            <div
              :style="{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: themeVars.railColor,
                borderRadius: '5px',
              }"
            >
              <n-button
                text
                :focusable="false"
                :style="{ padding: '.75rem' }"
                @click="cartStore.removeItem(data)"
              >
                -
              </n-button>

              {{ count }}

              <n-button
                text
                :focusable="false"
                :style="{ padding: '.75rem' }"
                @click="cartStore.addItem(data)"
              >
                +
              </n-button>
            </div>

            <n-button
              secondary
              type="error"
              @click="cartStore.clearItem(data)"
            >
              <template #icon>
                <n-icon :component="DeleteIcon" />
              </template>
            </n-button>
          </n-space>
        </n-list-item>

        <n-list-item :style="{fontSize: '1.15rem'}">
          <n-text depth="2">
            Total:
          </n-text>

          <n-text strong>
            {{ formatPrice(cartStore.getWorth()) }}
          </n-text>
        </n-list-item>
      </n-list>

      <template #footer>
        <NuxtLink
          to="/orders/new"
          :style="{ textDecoration: 'none' }"
        >
          <n-button
            :disabled="!isCheckoutPossible"
            type="primary"
            size="large"
            @click="hideCart"
          >
            Checkout
          </n-button>
        </NuxtLink>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import {
  NDrawer,
  NDrawerContent,
  NList,
  NListItem,
  NAvatar,
  NSpace,
  NText,
  NButton,
  NIcon,
  NEmpty,
  useThemeVars,
} from 'naive-ui';

import { TrashCan as DeleteIcon } from '@vicons/carbon';

const themeVars = useThemeVars();
const router = useRouter();
const { cartStore, hideCart } = useCart();
const { checkMobileScreen } = useResponsive();

const isCheckoutPossible = computed(() => {
  return cartStore.getSize() > 0;
});

const preventEmptyOrder = () => {
  if (router.currentRoute.value.path !== '/orders/new') {
    return;
  }

  const isCartEmpty = cartStore.getSize() === 0;

  if (!isCartEmpty) {
    return;
  }

  router.push('/menu');
};

watch(() => cartStore.items, cartStore.dump, {
  deep: true,
});

watch(() => cartStore.items, preventEmptyOrder, {
  deep: true,
});

onBeforeMount(cartStore.init);
</script>
