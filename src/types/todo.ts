// โครงสร้างข้อมูลของรายการงานแต่ละรายการ
export interface Todo {
  id: string;         // รหัสเฉพาะของแต่ละรายการ
  title: string;      // ชื่องาน
  completed: boolean; // สถานะเสร็จแล้วหรือยัง
  createdAt: string;  // วันเวลาที่สร้าง (ISO format)
  dueDate?: string;   // วันครบกำหนด (ไม่บังคับ)
}

// ประเภทตัวกรองรายการ
export type FilterType = "all" | "active" | "completed";
