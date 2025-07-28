<script setup lang="ts">
import TasksList from '@/components/TasksList.vue'
import { useTasksStore } from '@/stores/tasksStore.ts'
import { computed } from 'vue'

const tasksStore = useTasksStore()

const filtered = computed(() => tasksStore.filterTasksByStatus('todo', true))
</script>

<template>
  <div class="p-4">
    <header class="space-y-3 mb-4">
      <h1 class="text-3xl font-bold">К выполнению</h1>
      <p class="text-sm opacity-50">Задачи, ожидающие выполнения</p>
    </header>
    <main>
      <TasksList v-if="filtered.length > 0" :tasks="filtered" />
      <p v-else class="opacity-50 text-center">Нет задач со статусом "В процессе"</p>
    </main>
  </div>
</template>
