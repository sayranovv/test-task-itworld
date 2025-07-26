<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()
</script>

<template>
  <h2 class="pt-5 pb-3 text-2xl font-bold">Tasks</h2>
  <TaskItem v-for="task in tasksStore.filteredTasks" :key="task.id" :title="task.title" />
</template>
