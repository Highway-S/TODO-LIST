"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, dueDate?: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  // สถานะโหมดแก้ไข
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDue, setEditDue] = useState(todo.dueDate ?? "");

  // บันทึกการแก้ไข
  function handleSave() {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    onUpdate(todo.id, trimmed, editDue || undefined);
    setIsEditing(false);
  }

  // ยกเลิกการแก้ไข
  function handleCancel() {
    setEditTitle(todo.title);
    setEditDue(todo.dueDate ?? "");
    setIsEditing(false);
  }

  // ตรวจสอบสถานะวันครบกำหนด
  const today = new Date().toISOString().split("T")[0];
  const isOverdue = todo.dueDate && !todo.completed && todo.dueDate < today;
  const isDueToday = todo.dueDate && !todo.completed && todo.dueDate === today;

  // แปลงวันที่เป็นภาษาไทย
  function formatDate(dateStr: string) {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""} ${isDueToday ? "due-today" : ""}`}>
      {isEditing ? (
        /* โหมดแก้ไข */
        <div className="edit-mode">
          <input
            className="input-text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />
          <input
            type="date"
            className="input-date"
            value={editDue}
            onChange={(e) => setEditDue(e.target.value)}
          />
          <div className="edit-actions">
            <button className="btn btn-save" onClick={handleSave}>บันทึก</button>
            <button className="btn btn-cancel" onClick={handleCancel}>ยกเลิก</button>
          </div>
        </div>
      ) : (
        /* โหมดแสดงผล */
        <div className="view-mode">
          <label className="check-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="todo-check"
            />
            <span className="todo-title">{todo.title}</span>
          </label>

          {/* แสดงวันครบกำหนด พร้อมสีเตือน */}
          {todo.dueDate && (
            <span className={`due-badge ${isOverdue ? "badge-overdue" : isDueToday ? "badge-today" : "badge-normal"}`}>
              {isOverdue ? "เกินกำหนด" : isDueToday ? "วันนี้" : "กำหนด"} {formatDate(todo.dueDate)}
            </span>
          )}

          <div className="item-actions">
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>แก้ไข</button>
            <button className="btn btn-delete" onClick={() => onDelete(todo.id)}>ลบ</button>
          </div>
        </div>
      )}
    </li>
  );
}
