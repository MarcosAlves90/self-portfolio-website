<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from 'vue-i18n';
import { optimizeCloudinaryUrl, generateCloudinarySrcSet } from "@/utils/cloudinary";
import { buildProjectSkillsWithIcons } from "@/utils/projectSkills";
import CardBase from "@/components/templates/CardBase.vue";

const { t } = useI18n();

const props = defineProps<{
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  skills: string[];
  link?: string;
}>();

const src = computed(() => {
  if (!props.imageSrc) return props.imageSrc;
  return optimizeCloudinaryUrl(props.imageSrc, {
    width: 800,
    quality: 'auto:good',
    dpr: 'auto',
    crop: 'fill',
    gravity: 'auto',
  });
});

const srcset = computed(() => {
  if (!props.imageSrc) return "";
  return generateCloudinarySrcSet(props.imageSrc, [320, 480, 640, 800, 1024, 1280], {
    quality: 'auto:good',
    dpr: 'auto',
    crop: 'fill',
    gravity: 'auto',
  });
});

const skillsWithIcons = computed(() => buildProjectSkillsWithIcons(props.skills));
</script>

<template>
  <CardBase :link="props.link" :reverse="true">
    <template #leading>
      <div
        class="w-38 aspect-video overflow-hidden rounded shrink-0 bg-muted border-2 border-tertiary"
        role="img"
        :aria-label="props.imageAlt ?? t('projects.card.imageAltFallback', { title: props.title })"
      >
        <img
          :src="src"
          :srcset="srcset"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          :alt="props.imageAlt ?? props.title"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        >
      </div>
    </template>

    <div class="space-y-3">
      <div class="space-y-1">
        <h3
          :id="`project-${props.title.replace(/\s+/g, '-').toLowerCase()}`"
          class="font-medium lg:group-hover:text-highlight lg:group-focus:text-highlight transition-colors duration-200"
        >
          {{ props.title }}
          <i
            class="bi bi-box-arrow-up-right ml-1 group-hover:ml-3 group-focus:ml-3 transition-all duration-200"
            aria-hidden="true"
          />
        </h3>
        <p
          class="text-secondary text-sm transition-opacity duration-200 group-hover:opacity-95 group-focus:opacity-95"
          :aria-describedby="`project-${props.title.replace(/\s+/g, '-').toLowerCase()}`"
        >
          {{ props.description }}
        </p>
      </div>
      <ul class="flex flex-wrap gap-2 text-sm" role="list" :aria-label="t('projects.card.technologiesLabel')">
        <li
          v-for="skill in skillsWithIcons"
          :key="skill.name"
          role="listitem"
          class="bg-highlight/20 rounded-4xl px-2 text-highlight transition transform duration-150 ease-in-out inline-flex items-center gap-2"
        >
          <i :class="skill.iconClass" aria-hidden="true" />
          <span>{{ skill.name }}</span>
        </li>
      </ul>
    </div>
  </CardBase>
</template>

<style scoped>
.bg-muted {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
