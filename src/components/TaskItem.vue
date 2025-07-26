<script setup lang="ts">
import { Circle, ChevronRight, CircleCheck, CircleDotDashed } from 'lucide-vue-next'
import type { Task } from '@/types/models.ts'
defineProps<{ task: Task }>()
</script>

<template>
  <div class="py-3">
    <div class="flex justify-between items-start gap-4">
      <div class="flex gap-4 flex-1 overflow-hidden">
        <div class="size-12 shrink-0 bg-primary/5 rounded-lg flex justify-center items-center">
          <CircleCheck v-if="task.status === 'done'" />
          <CircleDotDashed v-else-if="task.status === 'todo'" />
          <Circle v-else />
        </div>
        <div class="flex flex-col justify-center overflow-hidden">
          <p class="font-medium">{{ task.title }}</p>
        </div>
      </div>
      <ChevronRight class="size-7 shrink-0" />
    </div>
    <div v-if="task.subtasks.length" class="ml-5 space-y-2">
      <TaskItem v-for="subtask in task.subtasks" :key="subtask.id" :task="subtask" />
    </div>
  </div>
</template>
