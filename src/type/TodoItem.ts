export interface TodoItem {
  id: number;
  done: boolean;
  text: string;
}

export interface TodoTaskProps {
  done: boolean;
  children: React.ReactNode;
}
