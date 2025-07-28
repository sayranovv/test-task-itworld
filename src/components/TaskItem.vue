<script setup lang="ts">
import { Circle, CircleCheck, Clock, X } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import type { Task } from '@/types/models.ts'
import CreateTaskDialog from '@/components/CreateTaskDialog.vue'

defineProps<{ task: Task }>()
</script>

<template>
  <div class="py-3">
    <div class="flex justify-between items-start gap-4">
      <div class="flex gap-4 flex-1 overflow-hidden items-center">
        <div class="size-12 shrink-0 bg-primary/5 rounded-lg flex justify-center items-center">
          <CircleCheck v-if="task.status === 'done'" />
          <Circle v-else-if="task.status === 'todo'" />
          <Clock v-else />
        </div>
        <div class="flex flex-col justify-center overflow-hidden">
          <p class="font-medium">{{ task.title }}</p>
        </div>

        <Badge>{{ task.status }}</Badge>

        <div class="flex gap-1">
          <Badge v-for="tag in task.tags" variant="outline">{{ tag }}</Badge>
        </div>
      </div>
      <div class="flex gap-4">
        <CreateTaskDialog button-title="Добавить подзадачу" />

        <X class="size-7 shrink-0" />
      </div>
    </div>
    <div v-if="task.subtasks.length" class="ml-5 space-y-2">
      <TaskItem v-for="subtask in task.subtasks" :key="subtask.id" :task="subtask" />
    </div>
  </div>
</template>
