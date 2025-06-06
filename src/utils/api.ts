import { Task } from '@/types/types'
import axios from 'axios'

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await axios.get('/api/tasks');
  return res.data;
};

export const updateTask = async (task: Task) => axios.put('/api/tasks', task);
export const addTask = async (task: Partial<Task>) => axios.post('/api/tasks', task);
export const deleteTask = async (id: string) => axios.delete('/api/tasks', { data: { id } });
