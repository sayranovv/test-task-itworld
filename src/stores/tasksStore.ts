import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, TaskStatus } from '@/types/models.ts'
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/storage.ts'
import { watch } from 'vue'

export const useTasksStore = defineStore('tasksStore', () => {
  const localData = loadFromLocalStorage()

  const tasks = ref<Task[]>(localData?.projects ?? [])
  const searchQuery = ref(localData?.filters.search ?? '')
  const selectedTags = ref<string[]>(localData?.filters.tags ?? [])
  const selectedStatus = ref<TaskStatus[]>(localData?.filters.statuses ?? [])

  const filteredTasks = computed(() => {
    const matchesTask = (task: Task): boolean => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesTags =
        selectedTags.value.length === 0 || selectedTags.value.some((tag) => task.tags.includes(tag))

      const matchesStatus =
        selectedStatus.value.length === 0 ||
        selectedStatus.value.some((status) => task.status.includes(status))

      return matchesSearch && matchesTags && matchesStatus
    }

    const filterRecursively = (task: Task): Task | null => {
      const filteredSubtasks = task.subtasks
        .map(filterRecursively)
        .filter((subtask): subtask is Task => subtask !== null)
      if (matchesTask(task) || filteredSubtasks.length > 0) {
        return {
          ...task,
          subtasks: filteredSubtasks,
        }
      }
      return null
    }
    return tasks.value.map(filterRecursively).filter((task): task is Task => task !== null)
  })

  const filterTasksByStatus = (status: TaskStatus, flatten = false): Task[] => {
    const matchesStatus = (task: Task): boolean => task.status === status

    const filterRecursively = (task: Task): Task[] => {
      const matched: Task[] = []

      if (matchesStatus(task)) {
        matched.push({ ...task, subtasks: [] })
      }

      for (const subtask of task.subtasks) {
        matched.push(...filterRecursively(subtask))
      }

      return matched
    }

    if (flatten) {
      return tasks.value.flatMap(filterRecursively)
    } else {
      const filterTree = (task: Task): Task | null => {
        const filteredSubtasks = task.subtasks
          .map(filterTree)
          .filter((sub): sub is Task => sub !== null)

        if (matchesStatus(task) || filteredSubtasks.length > 0) {
          return {
            ...task,
            subtasks: filteredSubtasks,
          }
        }
        return null
      }

      return tasks.value.map(filterTree).filter((t): t is Task => t !== null)
    }
  }

  const addTask = (task: Task): void => {
    tasks.value.push(task)
  }

  const updateTask = (updatedTask: Task) => {
    const findAndUpdate = (taskList: Task[]) => {
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === updatedTask.id) {
          taskList[i] = { ...updatedTask }
          return true
        }
        if (taskList[i].subtasks?.length) {
          const found = findAndUpdate(taskList[i].subtasks)
          if (found) return true
        }
      }
      return false
    }

    findAndUpdate(tasks.value)
  }

  const deleteTask = (taskId: string) => {
    const findAndDelete = (taskList: Task[]): boolean => {
      const index = taskList.findIndex((task) => task.id === taskId)
      if (index !== -1) {
        taskList.splice(index, 1)
        return true
      }

      for (const task of taskList) {
        if (task.subtasks?.length) {
          const deleted = findAndDelete(task.subtasks)
          if (deleted) return true
        }
      }

      return false
    }

    findAndDelete(tasks.value)
  }

  const addSubtask = (parentId: string, subtask: Task) => {
    const findAndAdd = (taskList: Task[]): boolean => {
      for (const task of taskList) {
        if (task.id === parentId) {
          if (!task.subtasks) task.subtasks = []
          task.subtasks.push(subtask)
          return true
        }
        if (task.subtasks?.length) {
          const added = findAndAdd(task.subtasks)
          if (added) return true
        }
      }
      return false
    }

    findAndAdd(tasks.value)
  }

  watch(
    [tasks, selectedStatus, selectedTags, searchQuery],
    ([newTasks, newStatuses, newTags, newSearch]) => {
      saveToLocalStorage(newTasks, newStatuses, newTags, newSearch)
    },
    { deep: true },
  )

  return {
    tasks,
    searchQuery,
    selectedTags,
    selectedStatus,
    filteredTasks,
    filterTasksByStatus,
    addTask,
    updateTask,
    deleteTask,
    addSubtask,
  }
})
