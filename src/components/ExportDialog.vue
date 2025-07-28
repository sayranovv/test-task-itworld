<script setup lang="ts">
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
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { useTasksStore } from '@/stores/tasksStore.ts'
import { exportToFile, importFromFile } from '@/utils/exportImport'
import { Label } from '@/components/ui/label'
import type { ExportedData } from '@/types/models.ts'
import { Download, Upload } from 'lucide-vue-next'

const props = defineProps<{ type: 'export' | 'import' }>()

const tasksStore = useTasksStore()

const isDialogOpen = ref(false)
const fileInputRef = ref<HTMLInputElement>()

const formSchema = toTypedSchema(
  z.object({
    password: z.string().min(8),
  }),
)

const onSubmit = async (values: any) => {
  if (props.type === 'export') {
    const exportData: ExportedData = {
      projects: tasksStore.tasks,
      filters: {
        statuses: tasksStore.selectedStatus,
        tags: tasksStore.selectedTags,
        search: tasksStore.searchQuery,
      },
    }

    exportToFile(exportData, values.password)

    toast('Экспорт выполнен!')
  } else if (props.type === 'import') {
    const file = fileInputRef.value?.files?.[0]
    if (!file) {
      toast('Файл не выбран')
      return
    }

    try {
      const rawData = await importFromFile(file, values.password) // импорт файла

      if (rawData && typeof rawData === 'object') {
        const data = rawData as ExportedData
        tasksStore.importData(data)
        toast('Импорт выполнен!')
      } else {
        toast('Не удалось расшифровать данные, возможно, неверный пароль')
      }
    } catch (error) {
      toast('Ошибка при импорте файла')
    }

    fileInputRef.value!.value = ''
  }

  isDialogOpen.value = false
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" :validation-schema="formSchema">
    <Dialog v-model:open="isDialogOpen">
      <!--кнопка-триггер-->
      <DialogTrigger as-child>
        <Button variant="secondary" v-if="type === 'export'">
          <Download class="w-4 h-4 block sm:hidden" />
          <span class="hidden sm:block">Экспорт</span>
        </Button>
        <Button v-if="type === 'import'">
          <Upload class="w-4 h-4 block sm:hidden" />
          <span class="hidden sm:block">Импорт</span>
        </Button>
      </DialogTrigger>

      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <span v-if="type === 'export'">Экспортировать</span>
            <span v-if="type === 'import'">Импортировать</span>
            задачи
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          id="dialogExportForm"
          @submit="handleSubmit($event, onSubmit)"
          class="grid gap-4 py-4"
        >
          <!--поле для загрузки файла-->
          <div class="grid grid-cols-4 items-center gap-4" v-if="type === 'import'">
            <Label for="file" class="text-right">Файл:</Label>
            <input
              id="file"
              ref="fileInputRef"
              type="file"
              accept=".txt"
              class="col-span-3 text-sm py-2 px-3 border rounded-md shadow-xs"
            />
          </div>

          <!--поле для ввода пароля-->
          <FormField v-slot="{ componentField }" name="password">
            <FormItem class="grid grid-cols-4 items-center gap-4">
              <FormLabel class="text-right">Пароль:</FormLabel>
              <FormControl>
                <Input
                  class="col-span-3"
                  :placeholder="
                    type === 'export' ? 'Введите пароль для шифрования' : 'Введите пароль'
                  "
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage class="col-span-4" />
            </FormItem>
          </FormField>
        </form>

        <!--кнопки-->
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="secondary">Отмена</Button>
          </DialogClose>
          <Button type="submit" form="dialogExportForm">
            <span v-if="type === 'export'">Экспорт</span>
            <span v-if="type === 'import'">Импорт</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
