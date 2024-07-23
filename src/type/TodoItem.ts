export interface TodoItem {
  id: number;
  done: boolean;
  title: string;
}

export interface TodoTaskProps {
  done: boolean;
  children: React.ReactNode;
}
