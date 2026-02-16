<script setup lang="ts">
import { computed } from "vue";
import type { Project } from "@/data/types";
import { buildProjectSkillsWithIcons } from "@/utils/projectSkills";
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  projects: Project[];
  formatLink: (link?: string) => string;
}>();

const { t } = useI18n();

const localize = (key: string, fallback: string) => {
  const res = t(key);
  return res && res !== key ? (res as string) : fallback;
};

const projectsWithSkills = computed(() =>
  props.projects.map((project) => ({
    ...project,
    skillsWithIcons: buildProjectSkillsWithIcons(project.skills),
  })),
);
</script>

<template>
  <table
    v-if="projects.length > 0"
    class="w-full"
    role="table"
    :aria-label="t('projects.table.aria.tableLabel')"
  >
    <thead>
      <tr>
        <th scope="col">
          {{ $t('projects.table.headers.year') }}
        </th>
        <th scope="col">
          {{ $t('projects.table.headers.project') }}
        </th>
        <th scope="col" class="hidden lg:table-cell">
          {{ $t('projects.table.headers.company') }}
        </th>
        <th scope="col" class="hidden lg:table-cell">
          {{ $t('projects.table.headers.technologies') }}
        </th>
        <th scope="col" class="hidden sm:table-cell">
          {{ $t('projects.table.headers.link') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(project, index) in projectsWithSkills" :key="`${project.title}-${project.year || 'na'}-${index}`" role="row">
        <td role="cell" class="text-tertiary" :data-label="$t('projects.table.headers.year')">
          {{ project.year || $t('projects.table.na') }}
        </td>
        <td role="cell" class="font-semibold" :data-label="$t('projects.table.headers.project')">
          <template v-if="project.link">
            <!-- Link visível apenas em telas pequenas (coluna de link está oculta) -->
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center group cursor-pointer text-highlight hover:text-primary sm:hidden relative"
              :aria-label="t('projects.table.aria.open', { title: localize(`projects.items.${project.id}.title`, project.title) })"
              :title="localize(`projects.items.${project.id}.description`, project.description)"
            >
              <span>{{ localize(`projects.items.${project.id}.title`, project.title) }}</span>
              <i
                class="bi bi-box-arrow-up-right ml-2 transform transition-transform duration-200 group-hover:translate-x-2 group-focus:translate-x-2"
                aria-hidden="true"
              />
            </a>

            <!-- Texto puro (visível em sm+), para evitar duplicidade quando há link -->
            <span class="hidden sm:inline relative cursor-help" :title="localize(`projects.items.${project.id}.description`, project.description)">{{ localize(`projects.items.${project.id}.title`, project.title) }}</span>
          </template>
          <template v-else>
            <span class="relative cursor-help" :title="project.description">{{
              project.title
            }}</span>
          </template>
        </td>
        <td role="cell" class="text-tertiary hidden lg:table-cell" :data-label="$t('projects.table.headers.company')">
          {{ project.company }}
        </td>
        <td role="cell" class="hidden lg:table-cell" :data-label="$t('projects.table.headers.technologies')">
          <ul class="flex flex-wrap gap-2 text-sm" role="list">
            <li
              v-for="skill in project.skillsWithIcons"
              :key="skill.name"
              role="listitem"
              class="bg-highlight/20 rounded-4xl px-2 text-highlight transition transform duration-150 ease-in-out hover:scale-105 inline-flex items-center gap-2"
            >
              <a
                v-if="skill.link"
                :href="skill.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2"
                :aria-label="t('projects.table.aria.goTo', { title: skill.name })"
              >
                <i :class="skill.iconClass" aria-hidden="true" />
                <span>{{ skill.name }}</span>
              </a>
              <template v-else>
                <i :class="skill.iconClass" aria-hidden="true" />
                <span>{{ skill.name }}</span>
              </template>
            </li>
          </ul>
        </td>
        <td role="cell" class="hidden sm:table-cell" :data-label="$t('projects.table.headers.link')">
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center group cursor-pointer text-highlight hover:text-primary"
            :aria-label="t('projects.table.aria.goTo', { title: project.title })"
          >
            <span>{{ props.formatLink(project.link) }}</span>
            <i
              class="bi bi-box-arrow-up-right ml-2 transform transition-transform duration-200 group-hover:translate-x-2 group-focus:translate-x-2"
              aria-hidden="true"
            />
          </a>
          <span v-else>{{ $t('projects.table.na') }}</span>
        </td>
      </tr>
    </tbody>
  </table>

  <div
    v-else
    class="text-center py-12"
    role="status"
    aria-live="polite"
  >
    <i class="bi bi-search text-4xl text-tertiary mb-4" aria-hidden="true" />
    <p class="text-secondary">
      {{ $t('projects.table.noResults') }}
    </p>
    <p class="text-tertiary text-sm mt-2">
      {{ $t('projects.table.noResultsHint') }}
    </p>
  </div>
</template>

<style scoped>
table th,
table td {
  text-align: left;
  padding: 1rem 0.5rem;
  min-height: 3rem;
  vertical-align: top;
}

th:nth-child(4) {
  width: 30%;
}

tbody tr {
  border-bottom: 1px solid var(--color-tertiary);
}
</style>
