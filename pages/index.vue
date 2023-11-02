<template>
  <div>
    <WelcomeScreen />
    <Advantages />
    <OrderInstruction />
    <Gallery />
    <TopDishes />
  </div>
</template>

<script setup lang="ts">
import {
  Advantages,
  Gallery,
  OrderInstruction,
  TopDishes,
  WelcomeScreen,
} from '~/components/home';

definePageMeta({ layout: 'home' });
</script>
