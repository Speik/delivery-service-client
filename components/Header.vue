<template>
  <n-page-header :style="{ padding: 0 }">
    <template #title>
      <NuxtLink
        to="/"
        :style="{ textDecoration: 'none' }"
      >
        <n-button
          text
          size="large"
          :focusable="false"
          :style="{ fontSize: '1.2rem' }"
        >
          <template #icon>
            <n-icon
              size="24"
              :component="TruckIcon"
              :color="
                inverted
                  ? themeVars.baseColor
                  : themeVars.primaryColorHover
              "
            />
          </template>

          <span
            :style="{
              ...(inverted && { color: themeVars.baseColor }),
            }"
          >
            Delivery service
          </span>
        </n-button>
      </NuxtLink>
    </template>

    <template #extra>
      <n-button
        v-show="checkMobileScreen()"
        @click="isNavigationShown = true"
      >
        <template #icon>
          <n-icon
            :component="MenuIcon"
            :color="
              inverted
                ? themeVars.baseColor
                : themeVars.primaryColorHover
            "
          />
        </template>
      </n-button>

      <div
        v-show="!checkMobileScreen()"
        :style="{ display: 'flex', alignItems: 'center' }"
      >
        <n-space
          :size="24"
          :style="{ marginRight: '1.5rem' }"
        >
          <NuxtLink
            v-for="meta in navigationMeta"
            :key="meta.key"
            :to="meta.route"
            :style="{ textDecoration: 'none' }"
          >
            <n-button
              text
              :text-color="meta.color"
              :focusable="false"
            >
              {{ meta.label }}
            </n-button>
          </NuxtLink>
        </n-space>

        <n-badge
          :value="cartStore.getSize()"
          :max="99"
          type="success"
        >
          <n-button
            :secondary="!inverted"
            :tertiary="inverted"
            type="primary"
            @click="showCart"
          >
            <template #icon>
              <n-icon
                :component="CartIcon"
                :color="
                  inverted
                    ? themeVars.baseColor
                    : themeVars.primaryColorHover
                "
              />
            </template>
          </n-button>
        </n-badge>
      </div>
    </template>
  </n-page-header>

  <MobileMenu
    v-model:show="isNavigationShown"
    @close="isNavigationShown = false"
  />
</template>

<script setup lang="ts">
import {
  NPageHeader,
  NIcon,
  NSpace,
  NButton,
  NBadge,
  useThemeVars,
} from 'naive-ui';

import {
  ShoppingCart as CartIcon,
  Delivery as TruckIcon,
  List as MenuIcon,
} from '@vicons/carbon';

const props = defineProps<{ inverted?: boolean }>();

const themeVars = useThemeVars();
const currentRoute = useRoute();
const { showCart, cartStore } = useCart();
const { checkMobileScreen } = useResponsive();

const isNavigationShown = ref(false);

const getLinkColor = (route: string) => {
  if (currentRoute.path === route) {
    return themeVars.value.primaryColorSuppl;
  }

  if (props.inverted) {
    return themeVars.value.baseColor;
  }
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
</script>
