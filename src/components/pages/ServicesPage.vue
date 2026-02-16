<script setup lang="ts">
// cspell:ignore vueuse
import { useHead } from "@vueuse/head";
import { useSEO, generateBreadcrumbSchema } from "@/composables/useSEO";
import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n';
import CommonLink from "@/components/atoms/CommonLink.vue";
import BackToTop from "@/components/atoms/BackToTop.vue";
import FiltersPanel from "@/components/molecules/FiltersPanel.vue";
import { serviceCategories } from "@/data/services";

const { t, te } = useI18n();

// cspell:ignore servicos
useSEO({
  title: t('services.seo.title'),
  description: t('services.seo.description'),
  canonicalPath: "/servicos",
});

// Adiciona breadcrumb schema
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        generateBreadcrumbSchema([
          {
            name: "Home",
            url: "https://marcospilgrim.com.br/",
          },
          {
            name: t('services.heading'),
            url: "https://marcospilgrim.com.br/servicos",
          },
        ])
      ),
    },
  ],
});

const searchTerm = ref("");
const selectedType = ref("all");
const filtersOpen = ref(false);

const handleToggleFilters = (isOpen: boolean) => {
  filtersOpen.value = isOpen;
};

// Helper para âncoras e IDs acessíveis (remove acentos e caracteres inválidos)
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const filterOptions = computed(() => {
  const defaultOption = {
    id: "all",
    label: t("services.filters.all"),
    description: t("services.filters.allDescription"),
  };

  const categories = serviceCategories.map((category) => {
    const id = category.id ?? slug(category.title);
    return {
      id,
      label: t(`services.categories.${category.id}.title`),
      description: t(`services.categories.${category.id}.description`),
    };
  });

  return [defaultOption, ...categories];
});

const selectedFilterOption = computed(
  () => filterOptions.value.find((option) => option.id === selectedType.value) ?? filterOptions.value[0]
);

const filterGroups = computed(() => [
  {
    id: "type",
    label: t("services.filters.legend"),
    description: t("services.filters.description"),
    options: filterOptions.value,
    selectedId: selectedType.value,
  },
]);

const filteredCategories = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  const isTypeFiltered = selectedType.value !== "all";

  const availableCategories = serviceCategories.filter((category) => {
    if (!isTypeFiltered) return true;
    return category.id === selectedType.value;
  });

  if (!term) return availableCategories;

  const includesTerm = (value: string) => value.toLowerCase().includes(term);

  return availableCategories.filter((category) => {
    const catTitle = t(`services.categories.${category.id}.title`);
    const catDesc = t(`services.categories.${category.id}.description`);
    if (includesTerm(catTitle) || includesTerm(catDesc)) return true;

    return category.tiers.some((tier) => {
      const tierName = t(`services.categories.${category.id}.tiers.${tier.id}.name`);
      const tierDesc = t(`services.categories.${category.id}.tiers.${tier.id}.description`);
      const featuresArr = getTierFeatures(category.id, tier.id, tier.features);

      if (includesTerm(tierName) || includesTerm(tierDesc)) return true;
      return featuresArr.some((feature: string) => includesTerm(feature));
    });
  });
});

import i18n from "@/i18n";

// Retorna mensagem bruta (sem passar por formatação do t) se existir
const getRawMessage = (key: string) => {
  try {
    const i18nUnknown = i18n as unknown;
    if (typeof i18nUnknown !== 'object' || i18nUnknown === null) return undefined;

    const globalObj = (i18nUnknown as Record<string, unknown>)['global'] as Record<string, unknown> | undefined;
    if (!globalObj) return undefined;

    const localeRef = globalObj['locale'];
    const locale = typeof localeRef === 'string' ? localeRef : (localeRef as { value?: string })?.value;
    const getLocaleMessage = globalObj['getLocaleMessage'] as ((l: string) => Record<string, unknown> | undefined) | undefined;

    const msgs = typeof getLocaleMessage === 'function' && locale ? getLocaleMessage(locale) || {} : {};
    const parts = key.split('.');
    let cur: unknown = msgs;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) cur = (cur as Record<string, unknown>)[p];
      else return undefined;
    }

    return cur;
  } catch {
    return undefined;
  }
};

// Retorna um array de features para um tier, preferindo a tradução quando definida
// Suporta arrays, strings JSON e strings com quebras de linha ou vírgulas
const getTierFeatures = (catId: string, tierId: string, defaultFeatures: string[]) => {
  const key = `services.categories.${catId}.tiers.${tierId}.features`;

  // 1) tente diretamente na mensagem bruta (garante arrays reais)
  const raw = getRawMessage(key);
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw === 'string') {
    const s = raw.trim();
    if (s.startsWith('[') && s.endsWith(']')) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore
      }
    }
    const parts = s.split(/\r?\n|\||,/).map(p => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts;
  }

  // 2) fallback para t()/te() (compatibilidade)
  if (te(key)) {
    const res: unknown = t(key);
    if (Array.isArray(res)) return res as string[];
    if (typeof res === 'string') {
      const s = res.trim();
      if (s.startsWith('[') && s.endsWith(']')) {
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          // ignore
        }
      }
      const parts = s.split(/\r?\n|\||,/).map(p => p.trim()).filter(Boolean);
      if (parts.length > 0) return parts;
    }
  }

  // 3) fallback definitivo para dados originais
  return defaultFeatures;
};

// Componente BackToTop lida com exibição e scroll

// Debug helper (dev only): inspeciona mensagens i18n brutas
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as Window & { __i18nGet?: (key: string) => unknown }).__i18nGet = (key: string) => getRawMessage(key) ?? (te(key) ? t(key) : null);
}
</script>

<template>
  <main class="p-0 w-full font-poppins">
    <div class="max-w-6xl w-full">
      <div class="space-y-2 sticky py-8 md:py-12 lg:py-16 top-0">
        <nav aria-label="Voltar para página inicial">
          <CommonLink
            to="/"
            label="Marcos Pilgrim"
            aria-label="Voltar para a página inicial"
            icon-position="left"
            icon-class="bi bi-arrow-left"
            wrapper-class="mb-5"
            link-class="font-semibold cursor-pointer group hover:text-highlight hover:underline transition-all duration-200 inline-flex items-center text-sm md:text-base"
          />
        </nav>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-semibold">
          {{ $t('services.heading') }}
        </h1>
      </div>
    </div>

    <div class="max-w-6xl w-full pb-8 md:pb-10">
      <div class="mb-8">
        <form role="search" class="relative" @submit.prevent>
          <label for="service-search" class="sr-only">{{ $t('services.search.label') }}</label>
          <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" aria-hidden="true" />
          <input
            id="service-search"
            v-model="searchTerm"
            type="search"
            :placeholder="$t('services.search.placeholder')"
            class="w-full pl-10 pr-4 py-3 bg-transparent border border-tertiary rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors duration-200"
            :aria-label="$t('services.search.ariaLabel')"
          >
        </form>
      </div>

      <div class="mb-6 space-y-3">
        <FiltersPanel
          :summary-label="$t('services.filters.summary')"
          :selected-label="selectedFilterOption.label"
          :selected-description="selectedFilterOption.description"
          description-id-base="service-type-filter-description"
          :groups="filterGroups"
          :is-open="filtersOpen"
          @toggle="handleToggleFilters"
          @select="({ optionId }) => { selectedType = optionId; }"
        />
      </div>

      <div class="space-y-20 pb-20" aria-live="polite" aria-relevant="additions text">
        <section v-if="filteredCategories.length === 0" class="py-12 text-center text-tertiary">
          {{ $t('services.noResults') }}
        </section>

        <section
          v-for="(category, cIndex) in filteredCategories"
          :id="slug(t(`services.categories.${category.id}.title`))"
          :key="cIndex"
          class="space-y-8"
        >
          <div class="flex items-center space-x-4 border-b border-highlight/10 pb-4">
            <i :class="['bi text-3xl text-highlight', category.icon]" />
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-primary">
                {{ $t(`services.categories.${category.id}.title`) }}
              </h2>
              <p class="text-secondary text-sm md:text-base mt-1">
                {{ $t(`services.categories.${category.id}.description`) }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article
              v-for="(tier, tIndex) in category.tiers"
              :key="tIndex"
              class="relative flex flex-col bg-highlight/5 rounded-xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              :class="[
                tier.recommended 
                  ? 'border-highlight shadow-lg shadow-highlight/10 scale-105 md:scale-105 z-10' 
                  : 'border-highlight/10 hover:border-highlight/30'
              ]"
            >
              <div v-if="tier.recommended" class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-highlight text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {{ $t('services.recommended') }}
              </div>

              <h3 class="text-xl font-bold text-primary mb-2">
                {{ $t(`services.categories.${category.id}.tiers.${tier.id}.name`) }}
              </h3>
              <p class="text-secondary text-sm mb-6 min-h-10">
                {{ $t(`services.categories.${category.id}.tiers.${tier.id}.description`) }}
              </p>
              
              <div class="mb-6">
                <span class="block text-xs text-tertiary uppercase mb-1">{{ $t('services.investmentLabel') }}</span>
                <span class="text-2xl font-bold text-highlight">{{ tier.price }}</span>
              </div>

              <ul class="space-y-3 mb-8 grow">
                <li v-for="(feature, fIndex) in getTierFeatures(category.id, tier.id, tier.features)" :key="fIndex" class="flex items-start text-tertiary text-sm">
                  <i class="bi bi-check-lg text-highlight mr-2 text-lg leading-none" />
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <a
                :href="`https://wa.me/5511949273886?text=${encodeURIComponent(t('services.whatsappMessage', { category: t(`services.categories.${category.id}.title`), tier: t(`services.categories.${category.id}.tiers.${tier.id}.name`) }))}`"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center px-6 py-3 border text-sm font-medium rounded-lg transition-colors duration-200"
                :class="[
                  tier.recommended
                    ? 'bg-highlight text-background hover:bg-highlight/90 border-transparent'
                    : 'bg-transparent text-highlight border-highlight hover:bg-highlight/10'
                ]"
              >
                {{ $t('services.requestQuote') }}
              </a>
            </article>
          </div>
        </section>
      </div>
    </div>

    <BackToTop />
  </main>
</template>
