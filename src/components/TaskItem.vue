<script setup lang="ts">
import { Circle, CircleCheck, Clock, X, Edit } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import type { Task } from '@/types/models.ts'
import CreateTaskDialog from '@/components/CreateTaskDialog.vue'
import { ref } from 'vue'
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTasksStore } from '@/stores/tasksStore.ts'
import { toast } from 'vue-sonner'

const props = defineProps<{ task: Task }>()

const tasksStore = useTasksStore()

const isEditing = ref(false)
const editedTitle = ref(props.task.title)
const editedStatus = ref(props.task.status)
const editedTags = ref([...props.task.tags])

const toggleEdit = () => {
  isEditing.value = !isEditing.value
  editedTitle.value = props.task.title
  editedStatus.value = props.task.status
  editedTags.value = [...props.task.tags]
}

const saveChanges = () => {
  tasksStore.updateTask({
    ...props.task,
    title: editedTitle.value,
    status: editedStatus.value,
    tags: [...editedTags.value],
  })

  toast('Задача обновлена')

  isEditing.value = false
}

const deleteTask = () => {
  tasksStore.deleteTask(props.task.id)
  toast('Задача удалена')
}
</script>

<template>
  <div class="py-3">
    <div class="flex justify-between items-center gap-4">
      <div class="flex gap-4 flex-1 flex-wrap sm:flex-nowrap overflow-hidden items-center">
        <div
          class="size-12 shrink-0 bg-primary/5 rounded-lg justify-center items-center hidden sm:flex"
        >
          <CircleCheck v-if="task.status === 'done'" />
          <Circle v-else-if="task.status === 'todo'" />
          <Clock v-else />
        </div>
        <div class="flex flex-col justify-center overflow-hidden">
          <div v-if="isEditing">
            <Input v-model="editedTitle" />
          </div>
          <p v-else class="font-medium leading-4 truncate">{{ task.title }}</p>
        </div>

        <div v-if="isEditing">
          <Select v-model="editedStatus">
            <SelectTrigger class="w-40">
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
        </div>
        <Badge v-else>{{
          task.status === 'todo'
            ? 'К выполнению'
            : task.status === 'in-progress'
              ? 'В процессе'
              : 'Завершено'
        }}</Badge>

        <div v-if="isEditing" class="flex gap-1 flex-wrap">
          <TagsInput v-model="editedTags">
            <TagsInputItem v-for="item in editedTags" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Теги" />
          </TagsInput>
        </div>
        <div v-else class="flex gap-1">
          <Badge v-for="tag in task.tags" variant="outline">{{ tag }}</Badge>
        </div>
      </div>

      <div v-if="isEditing" class="flex gap-2 items-center flex-col sm:flex-row">
        <Button size="sm" variant="secondary" @click="isEditing = false" class="w-full sm:w-fit"
          >Отмена</Button
        >
        <Button size="sm" @click="saveChanges">Сохранить</Button>
      </div>

      <div v-else class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
        <div class="hidden sm:block">
          <CreateTaskDialog
            button-title="Добавить подзадачу"
            button-size="sm"
            :parent-id="task.id"
          />
        </div>

        <Edit @click="toggleEdit" class="size-5 shrink-0 cursor-pointer" />

        <X @click="deleteTask" class="size-7 shrink-0 cursor-pointer" />
      </div>
    </div>
    <div v-if="task.subtasks.length" class="ml-5 space-y-2">
      <TaskItem v-for="subtask in task.subtasks" :key="subtask.id" :task="subtask" />
    </div>
  </div>
</template>
