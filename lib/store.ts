// lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Todo item type definition
export interface TodoItem {
  id: string;
  activity: string;
  price: number;
  type: 'education' | 'recreational' | 'social' | 'diy' | 'charity' | 'cooking' | 'relaxation' | 'music' | 'busywork';
  bookingRequired: boolean;
  accessibility: number;
}

// Todo store type
interface TodoStore {
  todos: TodoItem[];
  addTodo: (todo: Omit<TodoItem, 'id'>) => void;
  removeTodo: (id: string) => void;
  getTodoCount: () => number;
}

// Create the store with persistence
export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      
      // Add a new todo item
      addTodo: (todo) => set((state) => ({ 
        todos: [...state.todos, { ...todo, id: crypto.randomUUID() }] 
      })),
      
      // Remove a todo item by id
      removeTodo: (id) => set((state) => ({ 
        todos: state.todos.filter(todo => todo.id !== id) 
      })),
      
      // Get the total count of todo items
      getTodoCount: () => get().todos.length,
    }),
    {
      name: 'todo-storage', // name of the item in localStorage
    }
  )
);