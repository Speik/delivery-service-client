<template>
  <div
    :style="{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
    }"
  >
    <video
      :controls="false"
      autoplay
      loop
      muted
      playsinline
      :style="{
        position: 'absolute',
        translate: `0 ${parallaxIntencity}px`,
        top: 0,
        left: 0,
        zIndex: 0,
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }"
    >
      <source
        src="/videos/welcome.webm"
        type="video/webm"
      >
      <source
        src="/videos/welcome.mp4"
        type="video/mp4"
      >
    </video>

    <div
      :style="{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        color: themeVars.baseColor,
      }"
    >
      <div
        :style="{
          padding: '6rem 0 8rem 0',
          paddingRight: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
          paddingLeft: calc`1rem s:1.5rem m:2rem l:3rem xl:5rem 2xl:6rem`,
        }"
      >
        <h1
          :style="{
            fontSize: calc`2.5rem s:3rem m:3.5rem l:4rem xl:4rem 2xl:4rem`,
            margin: 0,
          }"
        >
          Food delivery
        </h1>

        <p
          :style="{
            fontSize: '1.15rem',
            maxWidth: checkSmallScreen() ? '80%' : '40%',
          }"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Alias perferendis laudantium debitis beatae, eaque molestias,
          quos qui vero
        </p>

        <NuxtLink
          to="/menu"
          :style="{ textDecoration: 'none' }"
        >
          <n-button
            type="primary"
            size="large"
            :style="{ fontSize: '1.15rem' }"
          >
            Order now
          </n-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, useThemeVars } from 'naive-ui';

const PARALLAX_BIAS = 0.375;

const themeVars = useThemeVars();
const { calc, checkSmallScreen } = useResponsive();

const parallaxIntencity = ref(0);

const onPageScroll = () => {
  parallaxIntencity.value = (
    Math.round(window.scrollY * PARALLAX_BIAS)
  );
};

/**
 * Since NaiveUI recommends subscribe to scroll at layout
 * component, we applying kinda crutch here to avoid
 * complex props drilling and other inapropriate stuff
 */
onBeforeMount(() => {
  window.addEventListener('scroll', onPageScroll);
});
</script>
