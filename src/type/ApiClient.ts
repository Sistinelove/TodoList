import { TodoItem } from './TodoItem.ts';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTodos(): Promise<TodoItem[]> {
    const response = await fetch(`${this.baseUrl}/todos`);
    if (!response.ok) {
      throw new Error('Ошибка получения туду');
    }
    return response.json();
  }

  async getTodo(id: number): Promise<TodoItem> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`);
    if (!response.ok) {
      throw new Error('ошибка получения туду');
    }
    return response.json();
  }

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('ошибка удаления тудухи');
    }
  }

  async updateTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Ошибка обновления тудухи');
    }
    return response.json();
  }

  async toggleDone(id: number): Promise<TodoItem> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Ошибка обновления чекбокса');
    }
    return response.json();
  }

  async addTodo(todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Ошибка добавления новой тудухи');
    }
    return response.json();
  }
}

export default new ApiClient('http://localhost:3001');
