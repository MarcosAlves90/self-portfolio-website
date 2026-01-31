import { ref, onMounted, onUnmounted } from "vue";

export default function useScrollProgress() {
  const progress = ref(0);
  let rAF = 0 as number | undefined;

  function update() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollHeight = doc.scrollHeight - window.innerHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.value = Math.min(100, Math.max(0, Math.round(pct * 100) / 100));
    rAF = undefined;
  }

  function onScroll() {
    if (rAF) return;
    rAF = requestAnimationFrame(update);
  }

  onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // ensure initial measurement
    onScroll();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (rAF) cancelAnimationFrame(rAF as number);
  });

  return { progress } as const;
}
