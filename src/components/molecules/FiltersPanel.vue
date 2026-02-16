<script setup lang="ts">
type FilterOption = {
  id: string;
  label: string;
  description?: string;
};

type FilterGroup = {
  id: string;
  label: string;
  description: string;
  options: FilterOption[];
  selectedId: string;
};

const props = defineProps<{
  summaryLabel: string;
  selectedLabel: string;
  selectedDescription?: string;
  descriptionIdBase: string;
  groups: FilterGroup[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (event: "toggle", isOpen: boolean): void;
  (event: "select", payload: { groupId: string; optionId: string }): void;
}>();

const handleToggle = (event: Event) => {
  emit("toggle", (event.currentTarget as HTMLDetailsElement).open);
};
</script>

<template>
  <details
    class="rounded-lg border border-tertiary/70 bg-background/80 shadow-sm"
    :open="props.isOpen"
    @toggle="handleToggle"
  >
    <summary
      class="group flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-secondary cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-highlight"
    >
      <span class="flex items-center gap-3">
        {{ props.summaryLabel }}
        <span class="rounded-full border border-tertiary/60 px-3 py-1 text-[11px] font-semibold normal-case tracking-normal text-primary">
          {{ props.selectedLabel }}
        </span>
      </span>
      <span class="flex items-center gap-2 text-xs font-medium normal-case tracking-normal text-tertiary">
        <span class="hidden md:inline">{{ props.selectedDescription }}</span>
        <i
          class="bi bi-chevron-down text-base transition-transform"
          :class="props.isOpen ? 'rotate-180' : ''"
          aria-hidden="true"
        />
      </span>
    </summary>
    <div class="space-y-3 border-t border-tertiary/50 px-4 py-4">
      <fieldset
        v-for="group in props.groups"
        :key="group.id"
        class="space-y-3"
        :aria-describedby="`${props.descriptionIdBase}-${group.id}`"
      >
        <legend class="sr-only">
          {{ group.label }}
        </legend>
        <p :id="`${props.descriptionIdBase}-${group.id}`" class="text-xs text-secondary">
          {{ group.description }}
        </p>
        <div
          role="radiogroup"
          :aria-label="group.label"
          :aria-describedby="`${props.descriptionIdBase}-${group.id}`"
          class="flex flex-wrap gap-2"
        >
          <button
            v-for="option in group.options"
            :key="option.id"
            type="button"
            role="radio"
            class="inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold transition focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
            :class="[
              group.selectedId === option.id
                ? 'border-highlight bg-highlight text-background shadow-sm'
                : 'border-tertiary/50 bg-transparent text-primary hover:border-highlight/60'
            ]"
            :aria-checked="group.selectedId === option.id"
            @click="emit('select', { groupId: group.id, optionId: option.id })"
          >
            <span>{{ option.label }}</span>
          </button>
        </div>
      </fieldset>
    </div>
  </details>
</template>
