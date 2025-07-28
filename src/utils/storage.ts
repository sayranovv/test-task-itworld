const STORAGE_KEY = 'todo_app_data'
import type { Task } from '@/types/models.ts'
import type { TaskStatus } from '@/types/models.ts'

// функция для подтягивания данных из localStorage (парсинг)
export const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored)

    const reviveDates = (task: Task): Task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      subtasks: task.subtasks?.map(reviveDates) || [],
    })

    return {
      projects: (parsed.projects || []).map(reviveDates),
      filters: {
        statuses: parsed.filters?.statuses || [],
        tags: parsed.filters?.tags || [],
        search: parsed.filters?.search || '',
      },
    }
  } catch (e) {
    console.error('Ошибка при чтении из localStorage', e)
    return null
  }
}

// функция сохранения данных
export const saveToLocalStorage = (
  tasks: Task[],
  statuses: TaskStatus[],
  tags: string[],
  search: string,
) => {
  const plainTasks = JSON.parse(JSON.stringify(tasks))

  const data = {
    projects: plainTasks,
    filters: {
      statuses,
      tags,
      search,
    },
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
