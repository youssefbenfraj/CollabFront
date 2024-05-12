export interface Task {
  id?: number;
  task: string;
  description: string;
  completed: boolean;
  priority: number;
  isFavorite: boolean;
  userId:any
}
