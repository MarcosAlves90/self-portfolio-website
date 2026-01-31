<script setup lang="ts">
import ExperienceCard from "@/components/molecules/ExperienceCard.vue";
import ProjectCard from "@/components/molecules/ProjectCard.vue";
import CommonLink from "@/components/atoms/CommonLink.vue";
import StickySectionBar from "@/components/atoms/StickySectionBar.vue";
import SocialLinks from "@/components/atoms/SocialLinks.vue";
import { useHead } from "@vueuse/head";
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { useSEO, generatePersonSchema, generateBreadcrumbSchema, generateProjectSchema } from "@/composables/useSEO";
import { experiences } from "@/data/experiences";
import { projectsMainPage } from "@/data/projects";
import { serviceCategories } from "@/data/services";
import { ref, onMounted, onUnmounted, watch } from "vue";

const { t, locale } = useI18n();

// Persist locale changes and set document language for accessibility
watch(locale, (val) => {
  if (typeof window !== 'undefined') localStorage.setItem('locale', val as string);
  if (typeof document !== 'undefined') document.documentElement.lang = val === 'pt' ? 'pt-BR' : 'en-US';
});

// Helper to return localized string when available (falls back to provided value)
const localize = (key: string, fallback: string) => {
  const res = t(key);
  return res && res !== key ? (res as string) : fallback;
};

useSEO({
  title: t('home.seo.title'),
  description: t('home.seo.description'),
  canonicalPath: "/",
});

// Adiciona structured data
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(generatePersonSchema()),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
          generateBreadcrumbSchema([
          {
            name: "Home",
            url: "https://marcospilgrim.com.br/",
          },
        ])
      ),
    },
    ...projectsMainPage.map(project => ({
      type: "application/ld+json",
      innerHTML: JSON.stringify(generateProjectSchema(
        localize(`projects.items.${project.id}.title`, project.title),
        localize(`projects.items.${project.id}.description`, project.description),
        project.imageSrc,
        project.link,
        project.skills
      )),
    })),

  ],
});

// Smooth scroll helper — usa querySelector para ser mais flexível
// Também atualiza a seção ativa imediatamente para evitar lacunas visuais
const scrollTo = (id: string) => {
  const el = document.querySelector<HTMLElement>(`#${id}`);
  // Marca a seção como ativa imediatamente (boa UX durante scroll suave)
  activeSection.value = id;
  // Move com comportamento suave e foca para acessibilidade
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
  el?.focus({ preventScroll: true });
};

// hover state para aplicar opacidade nos irmãos quando houver hover em um card
const hoveredExperience = ref<number | null>(null);
const hoveredProject = ref<number | null>(null);
const hoveredService = ref<number | null>(null);

// Estado para a seção ativa baseada no scroll
const activeSection = ref("sobre");
const sections = ["sobre", "experiencia", "projetos", "servicos-preview"];

// Preview com as primeiras categorias de serviços
const servicesPreview = serviceCategories.slice(0, 3);

// Função simples para gerar âncoras (remove acentos e caracteres inválidos)
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const isLargeScreen = ref(false);

const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
};

// Nova abordagem: Scroll listener determinístico
const handleScroll = () => {
  if (!isLargeScreen.value) return;

  const scrollPos = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // 1. Fallback absoluto para o topo
  if (scrollPos < 100) {
    activeSection.value = "sobre";
    return;
  }

  // 2. Fallback absoluto para o rodapé
  if (scrollPos + windowHeight >= fullHeight - 50) {
    activeSection.value = "servicos-preview";
    return;
  }

  // 3. Verificação por proximidade do topo
  const offset = 200;
  let currentSection = activeSection.value;
  
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el) {
      if (scrollPos + offset >= el.offsetTop) {
        currentSection = id;
      }
    }
  }
  activeSection.value = currentSection;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <main class="p-0 w-full font-poppins flex flex-col lg:flex-row">
    <!-- Lateral: informações iniciais e navegação -->
    <aside
      class="w-full lg:max-w-6xl lg:w-full"
      aria-label="Introdução do autor"
    >
      <header
        class="space-y-2 py-12 lg:py-16 lg:sticky lg:top-0 flex flex-col lg:h-screen justify-between"
      >
        <div class="space-y-3 max-lg:mb-10">
          <h1 class="text-3xl lg:text-5xl font-semibold">
            Marcos Pilgrim
          </h1>
          <h2 class="text-lg lg:text-xl font-medium">
            {{ $t('home.subtitle') }}
          </h2> 
          <p class="text-secondary lg:max-w-xs w-full">
            {{ $t('home.intro') }}
          </p>

          <nav aria-label="Navegação da página">
            <ul class="space-y-5 mt-10 lg:mt-15 font-semibold text-sm">
              <li
                :class="
                  isLargeScreen && activeSection === 'sobre'
                    ? 'text-primary'
                    : 'text-tertiary'
                "
              >
                <a
                  href="#sobre"
                  class="inline-flex items-center space-x-3 group transition-colors duration-200"
                  @click.prevent="scrollTo('sobre')"
                >
                  <span
                    :class="[
                      'inline-block h-px rounded transition-all duration-200',
                      isLargeScreen && activeSection === 'sobre'
                        ? 'w-15 bg-primary'
                        : 'w-10 bg-tertiary group-hover:w-15 group-hover:bg-primary',
                    ]"
                  />
                  <span
                    :class="[
                      'transition-colors duration-200',
                      isLargeScreen && activeSection === 'sobre'
                        ? 'text-primary'
                        : 'text-tertiary group-hover:text-primary',
                    ]"
                  >{{ $t('home.nav.about') }}</span>
                </a>
              </li>

              <li
                :class="
                  isLargeScreen && activeSection === 'experiencia'
                    ? 'text-primary'
                    : 'text-tertiary'
                "
              >
                <a
                  href="#experiencia"
                  class="inline-flex items-center space-x-3 group transition-colors duration-200"
                  @click.prevent="scrollTo('experiencia')"
                >
                  <span
                    :class="[
                      'inline-block h-px rounded transition-all duration-200',
                      isLargeScreen && activeSection === 'experiencia'
                        ? 'w-15 bg-primary'
                        : 'w-10 bg-tertiary group-hover:w-15 group-hover:bg-primary',
                    ]"
                  />
                  <span
                    :class="[
                      'transition-colors duration-200',
                      isLargeScreen && activeSection === 'experiencia'
                        ? 'text-primary'
                        : 'text-tertiary group-hover:text-primary',
                    ]"
                  >{{ $t('home.nav.experience') }}</span>
                </a>
              </li>

              <li
                :class="
                  isLargeScreen && activeSection === 'projetos'
                    ? 'text-primary'
                    : 'text-tertiary'
                "
              >
                <a
                  href="#projetos"
                  class="inline-flex items-center space-x-3 group transition-colors duration-200"
                  @click.prevent="scrollTo('projetos')"
                >
                  <span
                    :class="[
                      'inline-block h-px rounded transition-all duration-200',
                      isLargeScreen && activeSection === 'projetos'
                        ? 'w-15 bg-primary'
                        : 'w-10 bg-tertiary group-hover:w-15 group-hover:bg-primary',
                    ]"
                  />
                  <span
                    :class="[
                      'transition-colors duration-200',
                      isLargeScreen && activeSection === 'projetos'
                        ? 'text-primary'
                        : 'text-tertiary group-hover:text-primary',
                    ]"
                  >{{ $t('home.nav.projects') }}</span>
                </a>
              </li>

              <li
                :class="
                  isLargeScreen && activeSection === 'servicos-preview'
                    ? 'text-primary'
                    : 'text-tertiary'
                "
              >
                <a
                  href="#servicos-preview"
                  class="inline-flex items-center space-x-3 group transition-colors duration-200"
                  @click.prevent="scrollTo('servicos-preview')"
                >
                  <span
                    :class="[
                      'inline-block h-px rounded transition-all duration-200',
                      isLargeScreen && activeSection === 'servicos-preview'
                        ? 'w-15 bg-primary'
                        : 'w-10 bg-tertiary group-hover:w-15 group-hover:bg-primary',
                    ]"
                  />
                  <span
                    :class="[
                      'transition-colors duration-200',
                      isLargeScreen && activeSection === 'servicos-preview'
                        ? 'text-primary'
                        : 'text-tertiary group-hover:text-primary',
                    ]"
                  >{{ $t('home.nav.services') }}</span>
                </a>
              </li>
            </ul>
          </nav>

          <!-- Language switcher -->
          <div class="mt-6">
            <label for="language-select" class="sr-only">{{ $t('home.languageAriaLabel') }}</label>
            <select
              id="language-select"
              v-model="locale"
              class="text-sm bg-transparent border border-tertiary rounded px-2 py-1"
              :aria-label="$t('home.languageAriaLabel')"
            >
              <option value="pt">
                {{ $t('home.languages.pt') }} (PT)
              </option>
              <option value="en">
                {{ $t('home.languages.en') }} (EN)
              </option>
            </select>
          </div>
        </div>

        <SocialLinks />
      </header>
    </aside>

    <!-- Conteúdo principal: seções semânticas -->
    <div class="space-y-8 lg:space-y-12 w-full py-8 lg:py-16">
      <section id="sobre" class="lg:px-4" aria-labelledby="sobre-heading">
        <StickySectionBar section-id="sobre" :label="$t('home.section.about')" />
        <h2
          id="sobre-heading"
          class="max-lg:uppercase lg:sr-only font-semibold pb-6"
        >
          {{ $t('home.section.about') }}
        </h2> 
        <p class="text-secondary">
          {{ $t('home.about.description') }}
        </p>
      </section>

      <section
        id="experiencia"
        class="space-y-2"
        aria-labelledby="experiencia-heading"
      >
        <StickySectionBar section-id="experiencia" :label="$t('home.section.experience')" />
        <h2
          id="experiencia-heading"
          class="max-lg:uppercase lg:sr-only font-semibold pb-6"
        >
          {{ $t('home.section.experience') }}
        </h2>
        <div class="max-lg:space-y-10">
          <article
            v-for="(experience, i) in experiences"
            :key="`${experience.title}-${i}`"
            tabindex="0"
            :class="[
              'transition-opacity duration-200',
              hoveredExperience === null
                ? 'opacity-100'
                : hoveredExperience === i
                  ? 'opacity-100'
                  : 'opacity-40',
            ]"
            @mouseenter="hoveredExperience = i"
            @mouseleave="hoveredExperience = null"
            @focus="hoveredExperience = i"
            @blur="hoveredExperience = null"
          >
            <ExperienceCard
              :period="experience.period"
              :title="localize(`experience.items.${experience.id}.title`, experience.title)"
              :description="localize(`experience.items.${experience.id}.description`, experience.description)"
              :skills="experience.skills"
              :link="experience.link"
            />
          </article>
        </div>
      </section>

      <CommonLink
        href="https://res.cloudinary.com/dgsywmzb2/image/upload/v1755999385/curriculo-marcos_lopes.pdf"
        :label="$t('home.resumeLabel')"
        :aria-label="$t('home.resumeAriaLabel')"
        icon-position="right"
        icon-class="bi bi-box-arrow-up-right"
      />

      <section
        id="projetos"
        class="space-y-2"
        aria-labelledby="projetos-heading"
      >
        <StickySectionBar section-id="projetos" :label="$t('home.section.projects')" />
        <h2
          id="projetos-heading"
          class="max-lg:uppercase lg:sr-only font-semibold pb-6"
        >
          {{ $t('home.section.projects') }}
        </h2> 
        <div class="max-lg:space-y-10">
          <article
            v-for="(project, j) in projectsMainPage"
            :key="`${project.title}-${j}`"
            tabindex="0"
            :class="[
              'transition-opacity duration-200',
              hoveredProject === null
                ? 'opacity-100'
                : hoveredProject === j
                  ? 'opacity-100'
                  : 'opacity-40',
            ]"
            @mouseenter="hoveredProject = j"
            @mouseleave="hoveredProject = null"
            @focus="hoveredProject = j"
            @blur="hoveredProject = null"
          >
            <ProjectCard
              :title="localize(`projects.items.${project.id}.title`, project.title)"
              :description="localize(`projects.items.${project.id}.description`, project.description)"
              :link="project.link"
              :image-src="project.imageSrc"
              :image-alt="localize(`projects.items.${project.id}.imageAlt`, project.imageAlt || project.title)"
              :skills="project.skills"
            />
          </article>
        </div>
      </section>

      <CommonLink
        to="/projetos"
        :label="$t('home.viewAllProjects')"
        :aria-label="$t('home.viewAllProjectsAria')"
        icon-position="right"
      />

      <section id="servicos-preview" class="space-y-4 lg:space-y-6">
        <StickySectionBar section-id="servicos-preview" :label="$t('home.section.services')" />
        <div class="grid grid-cols-1 gap-4">
          <RouterLink
            v-for="(cat, idx) in servicesPreview"
            :key="`service-${idx}`"
            :to="{ path: '/servicos', hash: '#' + slug(t(`services.categories.${cat.id}.title`)) }"
            :class="[
              'block no-underline transition-opacity duration-200',
              hoveredService === null ? 'opacity-100' : hoveredService === idx ? 'opacity-100' : 'opacity-40'
            ]"
            tabindex="0"
            @mouseenter="hoveredService = idx"
            @mouseleave="hoveredService = null"
            @focus="hoveredService = idx"
            @blur="hoveredService = null"
          >
            <article class="p-4 bg-highlight/5 rounded-lg border border-highlight/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div class="flex items-start space-x-3">
                <i :class="['bi text-2xl text-highlight', cat.icon]" aria-hidden="true" />
                <div>
                  <h4 class="font-semibold text-primary">
                    {{ $t(`services.categories.${cat.id}.title`) }}
                  </h4>
                  <p class="text-secondary text-sm mt-1">
                    {{ $t(`services.categories.${cat.id}.description`) }}
                  </p>
                </div>
              </div>
            </article>
          </RouterLink>
        </div>
      </section>

      <CommonLink
        to="/servicos"
        :label="$t('home.viewAllServices')"
        :aria-label="$t('home.viewAllServicesAria')"
        icon-position="right"
      />
    </div>
  </main>
</template>
