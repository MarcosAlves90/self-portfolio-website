<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const open = ref(false);
const buttonRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);

const languages = computed(() => {
  const raw = t('home.languages');
  if (raw && typeof raw === 'object') return raw as Record<string, string>;
  return { en: t('home.languages.en'), pt: t('home.languages.pt') } as Record<string, string>;
});
const currentLabel = computed(() => languages.value[(locale.value as string)] || (locale.value as string));
const flagMap: Record<string, string> = { en: '🇺🇸', pt: '🇧🇷' };
const currentFlag = computed(() => flagMap[(locale.value as string)] || '');

const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);

const select = (code: string) => {
  locale.value = code;
  try {
    if (typeof window !== 'undefined') localStorage.setItem('locale', code);
    if (typeof document !== 'undefined') document.documentElement.lang = code === 'pt' ? 'pt-BR' : 'en-US';
  } catch {}
  close();
};

const onClickOutside = (e: MouseEvent) => {
  if (!menuRef.value || !buttonRef.value) return;
  const target = e.target as Node;
  if (!menuRef.value.contains(target) && !buttonRef.value.contains(target)) close();
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close();
};

onMounted(() => {
  window.addEventListener('click', onClickOutside);
  window.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('click', onClickOutside);
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div class="mt-4 lg:mt-6">
    <div class="relative inline-block text-left">
      <button
        ref="buttonRef"
        type="button"
        :aria-expanded="open"
        aria-haspopup="true"
        :aria-label="`${t('home.languageAriaLabel')}: ${currentLabel}`"
        class="flex items-center justify-between w-full lg:w-auto px-3 py-2 bg-transparent border border-tertiary rounded-lg text-sm font-semibold hover:bg-highlight/5 focus:outline-none focus:ring-2 focus:ring-highlight transition-colors duration-150"
        @click="toggle"
      >
        <span class="inline-flex items-center mr-2">
          <span class="mr-2 text-lg" aria-hidden="true">{{ currentFlag }}</span>
          <span>{{ currentLabel }}</span>
        </span>
        <i class="bi bi-chevron-down text-lg" aria-hidden="true" />
      </button>

      <div
        v-if="open"
        ref="menuRef"
        class="absolute z-20 mt-2 right-0 w-full lg:w-48 bg-background border border-tertiary rounded-lg shadow-lg overflow-hidden"
        role="menu"
        aria-label=""
      >
        <ul class="py-1">
          <li v-for="(label, code) in languages" :key="code">
            <button
              type="button"
              class="w-full text-left px-4 py-2 text-sm hover:bg-highlight/5 focus:bg-highlight/10 transition-colors duration-150"
              :aria-checked="locale === code"
              role="menuitemradio"
              @click="select(code)"
            >
              <span class="inline-flex items-center">
                <span class="mr-3 text-lg" aria-hidden="true">{{ flagMap[code] }}</span>
                <span class="mr-2">{{ label }}</span>
                <span v-if="locale === code" class="text-xs text-highlight">✓</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure full-width on small screens and compact on large */
@media (min-width: 1024px) {
  .relative.inline-block.text-left { width: auto; }
}
</style>