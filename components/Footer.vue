<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: calc`column s:row m:row l:row xl:row 2xl:row` as any,
    }"
  >
    <n-space vertical>
      <div :style="{ display: 'flex', alignItems: 'center' }">
        <n-icon
          size="20"
          :color="themeVars.textColor3"
          :component="TimeIcon"
          :style="{ marginRight: '.5rem' }"
        />

        <n-text depth="3">
          10:00 - 22:00
        </n-text>
      </div>

      <n-tooltip>
        <template #trigger>
          <a
            :href="`tel:${12345678900}`"
            :style="{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }"
          >
            <n-icon
              size="20"
              :color="themeVars.textColor3"
              :component="PhoneIcon"
              :style="{ marginRight: '.5rem' }"
            />

            <n-text depth="3">
              +12345678900
            </n-text>
          </a>
        </template>

        Click to call number
      </n-tooltip>

      <div
        :style="{
          display: 'flex',
          alignItems: 'flex-start',
          maxWidth: '384px',
        }"
      >
        <n-icon
          size="20"
          :color="themeVars.textColor3"
          :component="AddressIcon"
          :style="{ marginRight: '.5rem' }"
        />

        <n-text depth="3">
          Town, Random st, 12
        </n-text>
      </div>
    </n-space>

    <n-space
      vertical
      justify="space-between"
      :style="{ marginTop: calc`1.5rem s:0 m:0 l:0 xl:0 2xl:0` }"
    >
      <n-space
        :justify="
          calc`start s:space-around m:space-around l:space-around xl:space-around 2xl:space-around` as any
        "
      >
        <a
          v-for="meta in socialMeta"
          :key="meta.key"
          :href="meta.link"
          target="_blank"
        >
          <n-icon
            size="24"
            :color="themeVars.textColor3"
            :component="meta.icon"
          />
        </a>
      </n-space>

      <n-space>
        <img
          src="../assets/visa-logo.png"
          height="16"
          loading="lazy"
        >

        <img
          src="../assets/mastercard-logo.png"
          height="20"
          loading="lazy"
        >
      </n-space>
    </n-space>
  </div>

  <div :style="{ flex: '0 1 auto', textAlign: 'center', marginTop: '1.5rem' }">
    <n-text depth="3">
      &copy; Delivery Service,
      {{ new Date().getFullYear() }}.
    </n-text>
  </div>
</template>

<script setup lang="ts">
import { NText, NIcon, NSpace, NTooltip, useThemeVars } from 'naive-ui';

import {
  Time as TimeIcon,
  Phone as PhoneIcon,
  Location as AddressIcon,
  LogoInstagram as InstagramIcon,
  LogoFacebook as FacebookIcon,
  LogoTwitter as TwitterIcon,
} from '@vicons/carbon';

const themeVars = useThemeVars();
const { calc } = useResponsive();

const socialMeta = computed(() => {
  return [
    { key: 'instagram', icon: InstagramIcon, link: 'https://www.instagram.com' },
    { key: 'facebook', icon: FacebookIcon, link: 'https://www.facebook.com' },
    { key: 'twitter', icon: TwitterIcon, link: 'https://twitter.com' },
  ];
});
</script>
