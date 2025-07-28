<script setup lang="ts">
import TaskFilters from './TaskFilters.vue'
import TasksList from './TasksList.vue'
import { useTasksStore } from '@/stores/tasksStore.ts'

const tasksStore = useTasksStore()
</script>

<template>
  <div>
    <TaskFilters />
    <TasksList :tasks="tasksStore.filteredTasks" />
  </div>
</template>
