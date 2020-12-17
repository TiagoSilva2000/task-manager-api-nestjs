interface Task {
  id: number
  title: string
  description?: string
  due_date?: Date
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
