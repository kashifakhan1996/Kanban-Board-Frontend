export interface Task {
  id: string;
  title: string;
  column: 'Not Started' | 'In Progress' | 'Blocked' | 'Done';
  dueDate?: string;
  subtasks?: string[];
}