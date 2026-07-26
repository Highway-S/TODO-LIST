"use client";

import { useMemo, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { FilterType, Todo } from "@/types/todo";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function TodoPage() {
  // ดึงข้อมูลจาก localStorage ผ่าน custom hook
  const [todos, setTodos] = useLocalStorage<Todo[]>("next-todo-list", []);

  // สถานะตัวกรองรายการ
  const [filter, setFilter] = useState<FilterType>("all");

  // เพิ่มรายการใหม่
  function addTodo(title: string, dueDate?: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate,
    };
    setTodos((cur) => [newTodo, ...cur]);
  }

  // สลับสถานะเสร็จ/ยังไม่เสร็จ
  function toggleTodo(id: string) {
    setTodos((cur) =>
      cur.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // ลบรายการ
  function deleteTodo(id: string) {
    setTodos((cur) => cur.filter((todo) => todo.id !== id));
  }

  // แก้ไขชื่อและวันครบกำหนด
  function updateTodo(id: string, title: string, dueDate?: string) {
    setTodos((cur) =>
      cur.map((todo) =>
        todo.id === id ? { ...todo, title, dueDate } : todo
      )
    );
  }

  // ลบรายการที่เสร็จแล้วทั้งหมด
  function clearCompleted() {
    setTodos((cur) => cur.filter((todo) => !todo.completed));
  }

  // นับรายการที่ยังค้างอยู่
  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  // นับรายการที่เสร็จแล้ว
  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  // กรองรายการตามตัวกรองที่เลือก
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const filters: { label: string; value: FilterType }[] = [
    { label: "ทั้งหมด", value: "all" },
    { label: "ยังไม่เสร็จ", value: "active" },
    { label: "เสร็จแล้ว", value: "completed" },
  ];

  return (
    <main className="container">
      <header className="app-header">
        <h1 className="app-title">TODO Application</h1>
        <p className="app-subtitle">สร้างรายการที่ต้องทำได้เลย</p>
      </header>

      {/* สถิติภาพรวม */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{todos.length}</span>
          <span className="stat-label">ทั้งหมด</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-num">{remainingCount}</span>
          <span className="stat-label">ค้างอยู่</span>
        </div>
        <div className="stat-card done">
          <span className="stat-num">{completedCount}</span>
          <span className="stat-label">เสร็จแล้ว</span>
        </div>
      </div>

      {/* ฟอร์มเพิ่มงาน */}
      <TodoForm onAddTodo={addTodo} />

      {/* แถบกรองและปุ่มลบที่เสร็จแล้ว */}
      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-btn ${filter === f.value ? "active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            <span className="filter-count">
              {f.value === "all"
                ? todos.length
                : f.value === "active"
                ? remainingCount
                : completedCount}
            </span>
          </button>
        ))}
        {completedCount > 0 && (
          <button className="filter-btn btn-clear" onClick={clearCompleted}>
            ลบที่เสร็จแล้ว ({completedCount})
          </button>
        )}
      </div>

      {/* รายการงาน */}
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </main>
  );
}
