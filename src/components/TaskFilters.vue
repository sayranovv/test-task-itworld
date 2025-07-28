<script setup lang="ts">
import { Search } from 'lucide-vue-next'
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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTasksStore } from '@/stores/tasksStore.ts'
import { Input } from '@/components/ui/input'

const tasksStore = useTasksStore()
</script>

<template>
  <div>
    <!--строка поиска-->
    <div class="relative w-full items-center py-3">
      <Input
        type="text"
        placeholder="Поиск по названию"
        class="pl-12 h-12 !text-lg"
        v-model="tasksStore.searchQuery"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>

    <!--статус селект-->
    <div class="flex flex-col sm:flex-row gap-3 py-3">
      <Select multiple v-model="tasksStore.selectedStatus">
        <SelectTrigger class="w-full sm:w-44">
          <SelectValue placeholder="Выберите статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="todo"> К выполнению </SelectItem>
            <SelectItem value="in-progress"> В процессе </SelectItem>
            <SelectItem value="done"> Завершено </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <!--теги-->
      <TagsInput class="w-full sm:w-fit" v-model="tasksStore.selectedTags">
        <TagsInputItem v-for="item in tasksStore.selectedTags" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>
        <TagsInputInput placeholder="Теги" />
      </TagsInput>
    </div>
  </div>
</template>
