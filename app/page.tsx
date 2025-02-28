// app/page.tsx
import { TodoForm } from '@/components/todo-form';
import { TodoList } from '@/components/todo-list';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo List Application</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <TodoForm />
        </div>
        <div>
          <TodoList />
        </div>
      </div>
    </main>
  );
}