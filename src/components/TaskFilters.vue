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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTasksStore } from '@/stores/tasksStore.ts'

const tasksStore = useTasksStore()

const updateStatusFilter = (status: TaskStatus): void => {}
</script>

<template>
  <div>
    <div class="relative w-full items-center py-3">
      <Input
        type="text"
        placeholder="Search tasks"
        class="pl-12 h-12 !text-lg"
        v-model="tasksStore.searchQuery"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div class="flex gap-3 py-3">
      <Select multiple v-model="tasksStore.selectedStatus">
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="item in ['todo', 'in progress', 'done']" :value="item.toLowerCase()">
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <TagsInput v-model="tasksStore.selectedTags">
        <TagsInputItem v-for="item in tasksStore.selectedTags" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput placeholder="Tags" />
      </TagsInput>
    </div>
  </div>
</template>
