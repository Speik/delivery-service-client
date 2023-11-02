<template>
  <n-drawer
    v-bind="$attrs"
    width="100%"
  >
    <n-drawer-content
      title="Navigation"
      closable
      :native-scrollbar="false"
    >
      <n-list>
        <n-list-item
          v-for="meta in navigationMeta"
          :key="meta.key"
        >
          <NuxtLink
            :to="meta.route"
            :style="{ textDecoration: 'none' }"
          >
            <n-button
              text
              :text-color="meta.color"
              :focusable="false"
              @click="emit('close')"
            >
              {{ meta.label }}
            </n-button>
          </NuxtLink>
        </n-list-item>

        <n-list-item>
          <n-badge
            :value="cartStore.getSize()"
            :max="99"
            type="success"
            :offset="[16, 16]"
          >
            <n-button
              type="primary"
              text
              @click="onCartClick"
            >
              <template #icon>
                <n-icon
                  :component="CartIcon"
                  :color="themeVars.primaryColorHover"
                />
              </template>
              Cart
            </n-button>
          </n-badge>
        </n-list-item>
      </n-list>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import {
  NIcon,
  NButton,
  NBadge,
  NDrawer,
  NDrawerContent,
  NList,
  NListItem,
  useThemeVars,
} from 'naive-ui';

import { ShoppingCart as CartIcon } from '@vicons/carbon';

const emit = defineEmits(['close']);

const themeVars = useThemeVars();
const currentRoute = useRoute();
const { showCart, cartStore } = useCart();

const getLinkColor = (route: string) => {
  if (currentRoute.path === route) {
    return themeVars.value.primaryColorSuppl;
  }

  return themeVars.value.textColor1;
};

const navigationMeta = computed(() => {
  return [
    {
      key: 'home',
      label: 'Home',
      route: '/',
      color: getLinkColor('/'),
    },
    {
      key: 'menu',
      label: 'Menu',
      route: '/menu',
      color: getLinkColor('/menu'),
    },
    {
      key: 'myOrders',
      label: 'My orders',
      route: '/orders/my',
      color: getLinkColor('/orders/my'),
    },
    {
      key: 'about',
      label: 'About',
      route: '/about',
      color: getLinkColor('/about'),
    },
  ];
});

const onCartClick = () => {
  showCart();
  emit('close');
};
</script>
