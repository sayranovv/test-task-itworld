<script setup lang="ts">
import { Circle, ChevronRight } from 'lucide-vue-next'
defineProps<{
  title: string
  // description: string
}>()
</script>

<template>
  <div class="py-3 flex justify-between items-start gap-4">
    <div class="flex gap-4 flex-1 overflow-hidden">
      <div class="size-12 shrink-0 bg-primary/5 rounded-lg flex justify-center items-center">
        <Circle />
      </div>
      <div class="flex flex-col justify-center overflow-hidden">
        <p class="font-medium">{{ title }}</p>
        <!--        <p v-if="description" class="text-sm opacity-50 truncate">{{ description }}</p>-->
      </div>
    </div>
    <ChevronRight class="size-7 shrink-0" />
  </div>
</template>
