import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, dueDate?: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  // กรณีไม่มีรายการ
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">—</div>
        <p>ไม่มีรายการงานในหมวดนี้</p>
      </div>
    );
  }

  // วนแสดงรายการทั้งหมด
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
