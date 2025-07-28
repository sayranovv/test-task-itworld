<script setup lang="ts">
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'vue-sonner'
import { useTasksStore } from '@/stores/tasksStore.ts'

const props = defineProps<{
  buttonTitle?: string
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon'
  parentId?: string
}>()

const tasksStore = useTasksStore()

const selectedTags = ref([])
const isDialogOpen = ref(false)

const formSchema = toTypedSchema(
  z.object({
    taskTitle: z.string().min(2, 'Введите название').max(100),
    taskStatus: z.enum(['todo', 'in-progress', 'done']),
    taskTags: z.array(z.string()).optional(),
  }),
)

const onSubmit = (values: any) => {
  const newTask = {
    id: uuidv4(),
    title: values.taskTitle,
    status: values.taskStatus,
    tags: values.taskTags || [],
    subtasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  if (props.parentId) {
    tasksStore.addSubtask(props.parentId, newTask)
  } else {
    tasksStore.addTask(newTask)
  }

  toast('Задача создана', {
    description: 'Новая задача успешно добавлена!',
  })

  isDialogOpen.value = false

  selectedTags.value = []
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" :validation-schema="formSchema">
    <Dialog v-model:open="isDialogOpen">
      <DialogTrigger as-child>
        <Button :size="buttonSize || 'default'">{{ buttonTitle || 'Новая задача' }}</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать новую задачу</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)" class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="taskTitle">
            <FormItem class="grid grid-cols-4 items-center gap-4">
              <FormLabel class="text-right">Название</FormLabel>
              <FormControl>
                <Input
                  class="col-span-3"
                  placeholder="Введите название задачи"
                  v-bind="componentField"
                />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="taskStatus">
            <FormItem class="grid grid-cols-4 items-center gap-4">
              <FormLabel class="text-right">Статус</FormLabel>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="col-span-3 w-full">
                    <SelectValue placeholder="Выберите статус задачи" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="todo"> К выполнению </SelectItem>
                    <SelectItem value="in-progress"> В процессе </SelectItem>
                    <SelectItem value="done"> Выполнено </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="taskTags">
            <FormItem class="grid grid-cols-4 items-center gap-4">
              <FormLabel class="text-right">Теги</FormLabel>
              <FormControl>
                <TagsInput
                  :model-value="componentField.modelValue"
                  @update:model-value="componentField['onUpdate:modelValue']"
                  class="col-span-3 w-full"
                >
                  <TagsInputItem
                    v-for="item in componentField.modelValue"
                    :key="item"
                    :value="item"
                  >
                    <TagsInputItemText />
                    <TagsInputItemDelete />
                  </TagsInputItem>
                  <TagsInputInput placeholder="Введите тег и нажмите enter" />
                </TagsInput>
              </FormControl>
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="secondary"> Отмена </Button>
          </DialogClose>
          <Button type="submit" form="dialogForm"> Создать </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
