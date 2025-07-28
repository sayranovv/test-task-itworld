export interface Project {
  id: string
  name: string
  tasks: Task[]
}

export interface Task {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  tags: string[]
  subtasks: Task[]
  createdAt: Date
  updatedAt: Date
}

export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface ExportedData {
  projects: Task[]
  filters: {
    statuses: TaskStatus[]
    tags: string[]
    search: string
  }
}
