import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '@/types/models.ts'

export const useTasksStore = defineStore('tasksStore', () => {
  const tasks = ref<Task[]>([
    {
      id: '1',
      title: 'Hardcode task 1',
      status: 'todo',
      tags: ['tag1', 'gat2'],
      subtasks: [
        {
          id: '11',
          title: 'Hardcode subtask 1.1',
          status: 'in-progress',
          tags: ['exmpl1', 'exmpl2'],
          subtasks: [],
          createdAt: new Date('2025-07-25T14:30:00Z'),
          updatedAt: new Date('2025-07-25T14:30:00Z'),
        },
      ],
      createdAt: new Date('2025-07-26T14:30:00Z'),
      updatedAt: new Date('2025-07-26T14:30:00Z'),
    },
    {
      id: '2',
      title: 'Hardcode task 2',
      status: 'done',
      tags: ['tag1', 'gat2', 'hhh'],
      subtasks: [
        {
          id: '21',
          title: 'Hardcode subtask 2.1',
          status: 'in-progress',
          tags: ['exmpl1', 'exmpl2'],
          subtasks: [],
          createdAt: new Date('2025-07-25T14:30:00Z'),
          updatedAt: new Date('2025-07-25T14:30:00Z'),
        },
      ],
      createdAt: new Date('2025-07-26T14:30:00Z'),
      updatedAt: new Date('2025-07-26T14:30:00Z'),
    },
    {
      id: '3',
      title: 'Hardcode task 3',
      status: 'todo',
      tags: [],
      subtasks: [
        {
          id: '31',
          title: 'Hardcode subtask 3.1',
          status: 'done',
          tags: ['exmpl1', 'exmpl2'],
          subtasks: [],
          createdAt: new Date('2025-07-25T14:30:00Z'),
          updatedAt: new Date('2025-07-25T14:30:00Z'),
        },
      ],
      createdAt: new Date('2025-07-26T14:30:00Z'),
      updatedAt: new Date('2025-07-26T14:30:00Z'),
    },
  ])

  return {
    tasks,
  }
})
