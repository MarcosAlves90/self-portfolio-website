<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useSEO, generateBreadcrumbSchema, generateProjectSchema } from "@/composables/useSEO";
import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n';
import BackToTop from "@/components/atoms/BackToTop.vue";
import CommonLink from "@/components/atoms/CommonLink.vue";
import FiltersPanel from "@/components/molecules/FiltersPanel.vue";
import ProjectsTable from "@/components/organisms/ProjectsTable.vue";
import { projectsReverseSorted } from "@/data/projects";

const { t } = useI18n();

const localize = (key: string, fallback: string) => {
  const res = t(key);
  return res && res !== key ? (res as string) : fallback;
};

useSEO({
  title: t('projects.seo.title'),
  description: t('projects.seo.description'),
  canonicalPath: "/projetos",
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
            name: t('projects.breadcrumbName'),
            url: "https://marcospilgrim.com.br/projetos",
          },
        ])
      ),
    },
    ...projectsReverseSorted.map(project => ({
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

const searchTerm = ref("");
const filtersOpen = ref(false);
const selectedFilters = ref({
  technology: "all",
});

const handleToggleFilters = (isOpen: boolean) => {
  filtersOpen.value = isOpen;
};

const technologyOptions = computed(() => {
  const uniqueSkills = new Set<string>();
  projectsReverseSorted.forEach((project) => {
    project.skills.forEach((skill) => uniqueSkills.add(skill));
  });

  const sortedSkills = Array.from(uniqueSkills).sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" }),
  );

  return [
    { id: "all", label: "Todas as tecnologias", description: "Mostra todos os projetos." },
    ...sortedSkills.map((skill) => ({
      id: skill,
      label: skill,
      description: `Projetos com ${skill}.`,
    })),
  ];
});

const filterGroups = computed(() => [
  {
    id: "technology",
    label: "Tecnologias",
    description: "Filtre por uma tecnologia específica.",
    options: technologyOptions.value,
    selectedId: selectedFilters.value.technology,
  },
]);

const selectedTechnologyOption = computed(
  () => technologyOptions.value.find((option) => option.id === selectedFilters.value.technology)
    ?? technologyOptions.value[0],
);

const filteredProjects = computed(() => {
  const isTechnologyFiltered = selectedFilters.value.technology !== "all";
  if (!searchTerm.value) {
    return projectsReverseSorted.filter((project) =>
      !isTechnologyFiltered || project.skills.includes(selectedFilters.value.technology),
    );
  }

  const term = searchTerm.value.toLowerCase();
  return projectsReverseSorted.filter(
    (project) =>
      (!isTechnologyFiltered || project.skills.includes(selectedFilters.value.technology)) &&
      (
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.skills.some((skill) => skill.toLowerCase().includes(term)) ||
        (project.company && project.company.toLowerCase().includes(term))
      ),
  );
});

// Formata a URL para exibição compacta (sem protocolo/host longo)
const formatLink = (link?: string) => {
  if (!link) return "";
  return link
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace("marcosalves90.github.io/", "");
};

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
          {{ $t('projects.heading') }}
        </h1>
      </div>
    </div>

    <div class="max-w-6xl w-full pb-8 md:pb-10">
      <div class="mb-8">
        <form role="search" class="relative" @submit.prevent>
          <label for="project-search" class="sr-only">{{ $t('projects.search.label') }}</label>
          <i
            class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary"
            aria-hidden="true"
          />
          <input
            id="project-search"
            v-model="searchTerm"
            type="search"
            :placeholder="$t('projects.search.placeholder')"
            class="w-full pl-10 pr-4 py-3 bg-transparent border border-tertiary rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors duration-200"
            :aria-label="$t('projects.search.ariaLabel')"
          >
        </form>
      </div>

      <div class="mb-6 space-y-3">
        <FiltersPanel
          summary-label="Filtros"
          :selected-label="selectedTechnologyOption.label"
          :selected-description="selectedTechnologyOption.description"
          description-id-base="project-filter-description"
          :groups="filterGroups"
          :is-open="filtersOpen"
          @toggle="handleToggleFilters"
          @select="({ optionId }) => { selectedFilters.technology = optionId; }"
        />
      </div>

      <div class="space-y-12">
        <ProjectsTable :projects="filteredProjects" :format-link="formatLink" />
      </div>
    </div>

    <BackToTop />
  </main>
</template>

<style scoped>
table {
  width: 100%;
}

table {
  width: 100%;
}
</style>
