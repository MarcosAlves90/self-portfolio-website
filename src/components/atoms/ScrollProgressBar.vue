<template>
  <div class="scroll-progress" aria-hidden="true">
    <div class="scroll-progress__bar" :style="{ transform: `scaleX(${progress / 100})` }" />
  </div>
</template>

<script setup lang="ts">
import useScrollProgress from "@/composables/useScrollProgress";
const { progress } = useScrollProgress();
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 10000;
  pointer-events: none;
  background: transparent;
}
.scroll-progress__bar {
  height: 100%;
  width: 100%;
  background: var(--color-highlight);
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 0.12s linear;
  will-change: transform;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
}
@media (prefers-reduced-motion: reduce) {
  .scroll-progress__bar {
    transition: none !important;
  }
} 
</style>
