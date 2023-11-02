<template>
  <n-carousel
    autoplay
    draggable
    :slides-per-view="Number(calc`2 s:3 m:3 l:4 xl:5 2xl:5`)"
    :space-between="8"
  >
    <n-image
      v-for="meta in galleryMeta"
      :key="meta.index"
      :src="meta.src"
      class="carousel-img"
      lazy
      preview-disabled
      object-fit="cover"
      :img-props="{
        style: {
          aspectRatio: '1 / 1',
          maxWidth: '100%',
          borderRadius: '5px',
        },
      }"
    />
    <template #dots="{ total, currentIndex, to }">
      <ul class="custom-dots">
        <li
          v-for="index of total"
          :key="index"
          :class="{ ['is-active']: currentIndex === index - 1 }"
          @click="to(index - 1)"
        />
      </ul>
    </template>
  </n-carousel>
</template>

<script setup lang="ts">
import { NImage, NCarousel } from 'naive-ui';

const GALLERY_SIZE = 8;
const { calc } = useResponsive();

const galleryMeta = computed(() => {
  return Array.from({ length: GALLERY_SIZE }, (_, i: number) => {
    return { src: `/gallery/${i + 1}.jpg`, index: i };
  });
});
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.custom-dots {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 1.05rem;
  left: 50%;
  translate: -50% 0;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
