<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/types/models.ts'

defineProps<{ tasks: Task[] }>()
</script>

<template>
  <h2 class="pt-5 pb-3 text-2xl font-bold">Задачи</h2>
  <div v-if="tasks.length > 0">
    <TaskItem v-for="task in tasks" :key="task.id" :task />
  </div>
  <p v-else class="opacity-50 text-center">Нет задач</p>
</template>
