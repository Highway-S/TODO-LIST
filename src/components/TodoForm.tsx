"use client";

import { FormEvent, useState } from "react";

interface TodoFormProps {
  onAddTodo: (title: string, dueDate?: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  // เก็บข้อความในช่องกรอก
  const [title, setTitle] = useState("");
  // เก็บวันครบกำหนด
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onAddTodo(trimmedTitle, dueDate || undefined);
    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* ช่องกรอกชื่องานและปุ่มเพิ่ม */}
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="พิมพ์รายการงานใหม่..."
          className="input-text"
          maxLength={200}
        />
        <button type="submit" className="btn btn-primary">
          เพิ่มงาน
        </button>
      </div>
      {/* ช่องเลือกวันครบกำหนด */}
      <div className="form-row">
        <label className="due-label">กำหนดส่ง:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input-date"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
    </form>
  );
}
