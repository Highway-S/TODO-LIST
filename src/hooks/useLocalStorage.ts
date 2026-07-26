"use client";

import { useEffect, useState } from "react";

// Custom Hook สำหรับจัดการ Local Storage
// ใช้แทน useState ธรรมดา เพื่อให้ข้อมูลยังคงอยู่แม้รีเฟรชหน้า
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  // ป้องกันการเขียนทับข้อมูลเดิมก่อนโหลดเสร็จ
  const [isLoaded, setIsLoaded] = useState(false);

  // อ่านข้อมูลจาก localStorage ครั้งแรกที่ Component โหลด
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setValue(JSON.parse(saved) as T);
      }
    } catch {
      localStorage.removeItem(key);
    }
    setIsLoaded(true);
  }, [key]);

  // บันทึกข้อมูลลง localStorage ทุกครั้งที่ค่าเปลี่ยน
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, isLoaded]);

  return [value, setValue] as const;
}
