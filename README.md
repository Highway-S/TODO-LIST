# รายการงาน (TODO Application)

โปรแกรมจัดการรายการงาน พัฒนาด้วย Next.js, TypeScript และ Local Storage

## วิธีติดตั้งและรัน

```bash
npm install
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## โครงสร้างโปรเจกต์

```
src/
├── app/
│   ├── page.tsx            ← หน้าหลัก จัดการ State และฟังก์ชันทั้งหมด
│   ├── layout.tsx          ← โครงสร้าง HTML หลัก
│   └── globals.css         ← สไตล์ทั้งหมดของโปรแกรม
├── components/
│   ├── TodoForm.tsx        ← ฟอร์มสำหรับเพิ่มรายการงานใหม่และกำหนดวันส่ง
│   ├── TodoList.tsx        ← แสดงรายการงานทั้งหมด
│   └── TodoItem.tsx        ← รายการงานแต่ละรายการ พร้อมแก้ไขและลบ
├── hooks/
│   └── useLocalStorage.ts  ← Custom Hook สำหรับบันทึกข้อมูลลง Local Storage
└── types/
    └── todo.ts             ← กำหนดโครงสร้างข้อมูล Todo และ FilterType
```

---

## ความสามารถของโปรแกรม

| ฟังก์ชัน | อยู่ที่ไฟล์ |
|---------|------------|
| เพิ่มรายการงานใหม่ | `TodoForm.tsx` |
| ทำเครื่องหมายเสร็จ/ยังไม่เสร็จ | `TodoItem.tsx` → `toggleTodo` ใน `page.tsx` |
| แก้ไขชื่องานและวันครบกำหนด | `TodoItem.tsx` → `updateTodo` ใน `page.tsx` |
| ลบรายการงาน | `TodoItem.tsx` → `deleteTodo` ใน `page.tsx` |
| ลบรายการที่เสร็จแล้วทั้งหมด | `page.tsx` → `clearCompleted` |
| กรองรายการ (ทั้งหมด/ยังไม่เสร็จ/เสร็จแล้ว) | `page.tsx` → `filteredTodos` |
| กำหนดวันครบกำหนด พร้อมแจ้งเตือนสีแดงเมื่อเกิน | `TodoForm.tsx`, `TodoItem.tsx` |
| บันทึกข้อมูลลง Local Storage อัตโนมัติ | `hooks/useLocalStorage.ts` |

---