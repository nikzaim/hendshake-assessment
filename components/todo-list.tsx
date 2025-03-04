"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTodoStore, TodoItem } from "@/lib/store";
import { Trash2 } from "lucide-react";
import {
  CursorClick,
  PersonArmsSpread,
  Swatches,
  Tag,
} from "@phosphor-icons/react";

export function TodoList() {
  // Get todos and removeTodo from the store
  const todos = useTodoStore((state) => state.todos);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  // Memoize the todo count to avoid unnecessary re-renders
  const todoCount = useMemo(() => todos.length, [todos]);

  // Format the type string for display (capitalize first letter)
  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-100 p-4 rounded-md">
        <h2 className="text-xl font-medium">
          Your Tasks<span className="font-bold">({todoCount})</span>
        </h2>
      </div>

      {todos.length === 0 ? (
        <div className="text-center p-8 text-slate-500">
          No tasks added yet. Add a new task using the form.
        </div>
      ) : (
        <div className="grid gap-4">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={() => removeTodo(todo.id)}
              formatType={formatType}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// TodoCard component extracted to reduce complexity in the main component
function TodoCard({
  todo,
  onDelete,
  formatType,
}: {
  todo: TodoItem;
  onDelete: () => void;
  formatType: (type: string) => string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{todo.activity}</CardTitle>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="ml-2 cursor-pointer hover:bg-red-500"
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Tag size={18} color="#1cd43a" weight="fill" />
            <span className="font-medium">Price:</span> RM{" "}
            {todo.price.toFixed(2)}
          </div>
          <div className="flex items-center gap-1">
            <Swatches size={18} color="#1cb5d4" weight="fill" />
            <span className="font-medium">Type:</span> {formatType(todo.type)}
          </div>
          <div className="flex items-center gap-1">
            <CursorClick size={18} color="#bf1cd4" weight="fill" />
            <span className="font-medium">Booking:</span>{" "}
            {todo.bookingRequired ? "Required" : "Not Required"}
          </div>
          <div className="flex items-center gap-1">
            <PersonArmsSpread size={18} color="#f5c105" weight="fill" />
            <span className="font-medium">Accessibility:</span>{" "}
            {todo.accessibility.toFixed(1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
