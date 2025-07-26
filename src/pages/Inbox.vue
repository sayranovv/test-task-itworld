<script setup lang="ts">
import TaskListView from '@/components/TaskListView.vue'
</script>

<template>
  <div class="p-4">
    <header class="space-y-3 my-4">
      <h1 class="text-3xl font-bold">Inbox</h1>
      <p class="text-sm opacity-50">All tasks across all projects</p>
    </header>
    <main>
      <TaskListView />
    </main>
  </div>
</template>
