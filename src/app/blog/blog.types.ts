
export interface BlogPost{
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'todo' | 'in progress' | 'done';
  url: string;
}
