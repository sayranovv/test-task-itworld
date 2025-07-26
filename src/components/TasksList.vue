<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
</script>

<template>
  <h2 class="pt-5 pb-3 text-2xl font-bold">Tasks</h2>
  <TaskItem
    v-for="_ in 10"
    :key="_"
    title="Task example"
    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, perspiciatis."
  />
</template>
