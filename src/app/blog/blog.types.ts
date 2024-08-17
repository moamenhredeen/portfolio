
export interface BlogPost{
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'todo' | 'in progress' | 'done';
  url: string;
}
