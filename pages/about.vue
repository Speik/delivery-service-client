<template>
  <div>
    <div
      :style="{
        paddingBottom: '1.5rem',
        paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
        paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }"
    >
      <h1 :style="{ margin: 0, fontSize: '2rem', fontWeight: '400' }">
        About Us
      </h1>

      <div
        :style="{
          margin: '1rem 0',
          height: '3px',
          width: '64px',
          backgroundColor: themeVars.primaryColorSuppl,
          borderRadius: '3px',
        }"
      />

      <div :style="{ width: checkMobileScreen() ? '100%' : '65%' }">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Maxime, debitis officiis provident rem distinctio autem
        dolorum rerum impedit cum in possimus velit sunt molestias
        ex soluta nam, illum aliquid hic! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Odio dolore tempora
        laudantium quia quas eaque veniam architecto corporis sequi
        ex. Praesentium distinctio deleniti in perspiciatis, vitae
        sint nobis impedit beatae?
      </div>
    </div>

    <n-space
      align="flex-start"
      :vertical="checkMobileScreen()"
      justify="space-around"
      :size="checkMobileScreen() ? 16 : 8"
      :style="{
        padding: '3rem 0',
        ...borderStyles,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
      }"
    >
      <n-thing>
        <template #avatar>
          <n-icon
            size="28"
            :color="themeVars.primaryColorHover"
            :component="AddressIcon"
          />
        </template>

        <template #header>
          <div :style="{ fontSize: '1.25rem' }">
            Location
          </div>
        </template>

        <template #description>
          <div :style="{ maxWidth: '384px' }">
            Town, Random st, 12
          </div>
        </template>
      </n-thing>

      <n-thing>
        <template #avatar>
          <n-icon
            size="28"
            :color="themeVars.primaryColorHover"
            :component="TimeIcon"
          />
        </template>

        <template #header>
          <div :style="{ fontSize: '1.25rem' }">
            Working hours
          </div>
        </template>

        <template #description>
          <div>
            10:00 - 22:00
          </div>
        </template>
      </n-thing>

      <n-thing>
        <template #avatar>
          <n-icon
            size="28"
            :color="themeVars.primaryColorHover"
            :component="PhoneIcon"
          />
        </template>

        <template #header>
          <div :style="{ fontSize: '1.25rem' }">
            Contact us
          </div>
        </template>

        <template #description>
          <n-tooltip>
            <template #trigger>
              <a
                :href="`tel:${12345678900}`"
                :style="{
                  textDecoration: 'none',
                  color: themeVars.textColor1,
                  display: 'flex',
                  alignItems: 'center',
                }"
              >
                +12345678900
              </a>
            </template>

            Click to call number
          </n-tooltip>
        </template>
      </n-thing>
    </n-space>

    <iframe
      :src="googleMapUrl"
      :style="{
        width: '100%',
        height: '450px',
        border: 0,
        borderRadius: '5px',
        boxShadow: themeVars.boxShadow1,
      }"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>

<script setup lang="ts">
import { NIcon, NThing, NTooltip, NSpace, useThemeVars } from 'naive-ui';
import { CSSProperties } from 'nuxt/dist/app/compat/capi';

import {
  Time as TimeIcon,
  Phone as PhoneIcon,
  Location as AddressIcon,
} from '@vicons/carbon';

useHead({ title: 'About Us' });

const themeVars = useThemeVars();
const { calc, checkMobileScreen } = useResponsive();

const borderStyles: CSSProperties = {
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: themeVars.value.dividerColor,
  borderRadius: '5px',
};

const googleMapUrl = (
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1448.4009287976924!2d41.61522673425174!3d41.640969468206244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406786745decf49b%3A0xbe4c70cfa6fa87eb!2sRotation!5e0!3m2!1sen!2sge!4v1694113223200!5m2!1sen!2sge'
);
</script>
