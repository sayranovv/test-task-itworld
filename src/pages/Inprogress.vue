<script setup lang="ts">
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasksStore.ts'
import { computed } from 'vue'

const tasksStore = useTasksStore()

const filtered = computed(() => tasksStore.filterTasksByStatus('in-progress', true))
</script>

<template>
  <div class="p-4">
    <header class="space-y-3 mb-4">
      <h1 class="text-3xl font-bold">В процессе</h1>
      <p class="text-sm opacity-50">Задачи, находящиеся в процессе выполнения</p>
    </header>
    <main>
      <TasksList :tasks="filtered" />
    </main>
  </div>
</template>
