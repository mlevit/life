<script setup>
import Header from "./components/Header.vue";
import Timeline from "./components/Timeline.vue";
</script>

<script>
import nightwind from "nightwind/helper";

export default {
  data() {
    return {
      nightwind,
    };
  },
};
</script>

<template>
  <header class="fixed bottom-0 left-0 z-30 m-0 ml-3 mb-6">
    <Header />
  </header>

  <main>
    <Timeline />
  </main>
</template>

<style scoped></style>
