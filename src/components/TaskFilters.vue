<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import TaskFilterMultipleSelect from './TaskFilterMultipleSelect.vue'
import type { TaskStatus } from '@/types/models.ts'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'

const updateStatusFilter = (status: TaskStatus): void => {}

const selectedTags = ref([])

watch(selectedTags, () => {})
</script>

<template>
  <div>
    <div class="relative w-full items-center py-3">
      <Input id="search" type="text" placeholder="Search tasks" class="pl-12 h-12 !text-lg" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div class="flex gap-3 py-3">
      <TaskFilterMultipleSelect
        class="w-full"
        :items="['todo', 'in progress', 'done']"
        :placeholder="'Select a status'"
        @click="updateStatusFilter"
      />

      <TagsInput v-model="selectedTags">
        <TagsInputItem v-for="item in selectedTags" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput placeholder="Tags" />
      </TagsInput>
    </div>
  </div>
</template>
