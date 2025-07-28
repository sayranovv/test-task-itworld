<script setup lang="ts">
import TaskListView from '@/components/TaskListView.vue'
</script>

<template>
  <div class="p-4">
    <header class="space-y-3 mb-4">
      <h1 class="text-3xl font-bold">Все задачи</h1>
    </header>
    <main>
      <TaskListView />
    </main>
  </div>
</template>
