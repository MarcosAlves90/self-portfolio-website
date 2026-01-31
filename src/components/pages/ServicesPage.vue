<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useSEO, generateBreadcrumbSchema } from "@/composables/useSEO";
import { ref, computed } from "vue";
import CommonLink from "@/components/atoms/CommonLink.vue";
import BackToTop from "@/components/atoms/BackToTop.vue";
import { serviceCategories } from "@/data/services";

useSEO({
  title: "Serviços e Preços — Desenvolvimento Web, Apps e Software",
  description:
    "Serviços de desenvolvimento web, aplicativos e software por Marcos Pilgrim. Solicite orçamento, contrate soluções para landing pages, e-commerces e sistemas sob medida.",
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
            name: "Serviços",
            url: "https://marcospilgrim.com.br/servicos",
          },
        ])
      ),
    },
  ],
});

const searchTerm = ref("");

const filteredCategories = computed(() => {
  if (!searchTerm.value) return serviceCategories;
  const term = searchTerm.value.toLowerCase();
  return serviceCategories.filter((category) => {
    if (category.title.toLowerCase().includes(term)) return true;
    if (category.description.toLowerCase().includes(term)) return true;
    return category.tiers.some((tier) =>
      tier.name.toLowerCase().includes(term) ||
      tier.description.toLowerCase().includes(term) ||
      tier.features.some((f) => f.toLowerCase().includes(term))
    );
  });
});

// Helper para âncoras (remove acentos e caracteres inválidos)
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

// Componente BackToTop lida com exibição e scroll
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
          Serviços e Preços
        </h1>
      </div>
    </div>

    <div class="max-w-6xl w-full pb-8 md:pb-10">
      <div class="mb-8">
        <form role="search" class="relative" @submit.prevent>
          <label for="service-search" class="sr-only">Buscar serviços</label>
          <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" aria-hidden="true" />
          <input
            id="service-search"
            v-model="searchTerm"
            type="search"
            placeholder="Buscar serviços por categoria, nome, descrição ou recurso..."
            class="w-full pl-10 pr-4 py-3 bg-transparent border border-tertiary rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors duration-200"
            aria-label="Buscar serviços"
          >
        </form>
      </div>

      <div class="space-y-20 pb-20">
        <section v-if="filteredCategories.length === 0" class="py-12 text-center text-tertiary">
          Nenhum serviço corresponde à sua busca.
        </section>

        <section
          v-for="(category, cIndex) in filteredCategories"
          :id="slug(category.title)"
          :key="cIndex"
          class="space-y-8"
        >
          <div class="flex items-center space-x-4 border-b border-highlight/10 pb-4">
            <i :class="['bi text-3xl text-highlight', category.icon]" />
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-primary">
                {{ category.title }}
              </h2>
              <p class="text-secondary text-sm md:text-base mt-1">
                {{ category.description }}
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
                Recomendado
              </div>

              <h3 class="text-xl font-bold text-primary mb-2">
                {{ tier.name }}
              </h3>
              <p class="text-secondary text-sm mb-6 min-h-10">
                {{ tier.description }}
              </p>
              
              <div class="mb-6">
                <span class="block text-xs text-tertiary uppercase mb-1">Investimento</span>
                <span class="text-2xl font-bold text-highlight">{{ tier.price }}</span>
              </div>

              <ul class="space-y-3 mb-8 grow">
                <li v-for="(feature, fIndex) in tier.features" :key="fIndex" class="flex items-start text-tertiary text-sm">
                  <i class="bi bi-check-lg text-highlight mr-2 text-lg leading-none" />
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <a
                :href="`https://wa.me/5511949273886?text=${encodeURIComponent(`Olá, gostaria de solicitar um orçamento para: ${category.title} - ${tier.name}`)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center px-6 py-3 border text-sm font-medium rounded-lg transition-colors duration-200"
                :class="[
                  tier.recommended
                    ? 'bg-highlight text-background hover:bg-highlight/90 border-transparent'
                    : 'bg-transparent text-highlight border-highlight hover:bg-highlight/10'
                ]"
              >
                Solicitar Orçamento
              </a>
            </article>
          </div>
        </section>
      </div>
    </div>

    <BackToTop />
  </main>
</template>
