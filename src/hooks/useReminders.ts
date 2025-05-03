import { useEffect, useState } from 'react';
import { loadReminders, saveReminders } from '../utils/storage';
import { scheduleNotification, cancelNotification } from '../utils/notifications';

export interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  note: string;
  status: boolean;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  // helper ghép date + time
  const toDateTime = (dISO: string, tISO: string) => {
    const d = new Date(dISO), t = new Date(tISO);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes());
  };

  const loadAll = async () => {
    const data = await loadReminders();
    setReminders(data);
  };

  useEffect(() => {
    (async () => {
      await loadAll();
      setLoading(false);
    })();
  }, []);

  const persist = async (items: Reminder[]) => {
    setReminders(items);
    await saveReminders(items);
  };

  const addReminder = async ({ title, date, time, note }: {
    title: string; date: Date; time: Date; note: string;
  }) => {
    const id = Date.now().toString();
    const newItem: Reminder = {
      id,
      title,
      date: date.toISOString(),
      time: time.toISOString(),
      note,
      status: false,
    };
    await persist([newItem, ...reminders]);
    // lên lịch notification
    const dt = toDateTime(newItem.date, newItem.time);
    await scheduleNotification(id, title, dt);
  };

  const deleteReminder = async (id: string) => {
    await persist(reminders.filter(r => r.id !== id));
    await cancelNotification(id);
  };

  const updateReminder = async (
    id: string,
    data: { title: string; date: Date; time: Date; note: string }
  ) => {
    const updated = reminders.map(r =>
      r.id === id
        ? {
            ...r,
            title: data.title,
            date: data.date.toISOString(),
            time: data.time.toISOString(),
            note: data.note,
          }
        : r
    );
    await persist(updated);

    // hủy rồi schedule lại
    await cancelNotification(id);
    const dt = toDateTime(data.date.toISOString(), data.time.toISOString());
    await scheduleNotification(id, data.title, dt);
  };

  const toggleStatus = async (id: string) => {
    const updated = reminders.map(r =>
      r.id === id ? { ...r, status: !r.status } : r
    );
    await persist(updated);
  };

  return {
    reminders,
    loading,
    addReminder,
    deleteReminder,
    updateReminder,
    toggleStatus,
  };
}




















// import { useEffect, useState } from 'react';
// import { loadReminders, saveReminders } from '../utils/storage';

// export interface Reminder {
//   id: string;
//   title: string;
//   date: string; 
//   time: string; 
//   note: string;
//   status: boolean;
// }

// export function useReminders() {
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadAll = async () => {
//     const data = await loadReminders();
//     const normalized = data.map(r => ({
//       ...r,
//       note: r.note ?? '',
//       status: typeof r.status === 'boolean' ? r.status : false,
//     }));
//     setReminders(normalized);
//   };

//   useEffect(() => {
//     (async () => {
//       await loadAll();
//       setLoading(false);
//     })();
//   }, []);

//   const persist = async (items: Reminder[]) => {
//     setReminders(items);
//     await saveReminders(items);
//   };

//   const addReminder = async (item: {
//     title: string;
//     date: Date;
//     time: Date;
//     note: string;
//   }) => {
//     const newItem: Reminder = {
//       id: Date.now().toString(),
//       title: item.title,
//       date: item.date.toISOString(),
//       time: item.time.toISOString(),
//       note: item.note,
//       status: false,
//     };
//     await persist([newItem, ...reminders]);
//   };

//   const toggleStatus = async (id: string) => {
//     const updated = reminders.map(r =>
//       r.id === id ? { ...r, status: !r.status } : r
//     );
//     await persist(updated);
//   };

//   const deleteReminder = async (id: string) => {
//     const filtered = reminders.filter(r => r.id !== id);
//     await persist(filtered);
//   };

//   const updateReminder = async (
//     id: string,
//     data: { title: string; date: Date; time: Date; note: string }
//   ) => {
//     const updated = reminders.map(r =>
//       r.id === id
//         ? {
//             ...r,
//             title: data.title,
//             date: data.date.toISOString(),
//             time: data.time.toISOString(),
//             note: data.note,
//           }
//         : r
//     );
//     await persist(updated);
//   };

//   const refreshReminders = async () => {
//     setRefreshing(true);
//     await loadAll();
//     setRefreshing(false);
//   };

//   return {
//     reminders,
//     loading,
//     refreshing,
//     addReminder,
//     toggleStatus,
//     deleteReminder,
//     updateReminder,
//     refreshReminders,
//   };
// }


// src/hooks/useReminders.ts
// import { useEffect, useState } from 'react';
// import { loadReminders, saveReminders } from '../utils/storage';
// import { scheduleNotification, cancelNotification } from '../utils/notifications';

// export interface Reminder {
//   id: string;
//   title: string;
//   date: string; // ISO string (chỉ phần ngày)
//   time: string; // ISO string (chỉ phần giờ)
//   note: string;
//   status: boolean;
// }

// export function useReminders() {
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [loading, setLoading] = useState(true);

//   // helper ghép date + time thành Date
//   const toDateTime = (dateISO: string, timeISO: string) => {
//     const d = new Date(dateISO);
//     const t = new Date(timeISO);
//     return new Date(
//       d.getFullYear(),
//       d.getMonth(),
//       d.getDate(),
//       t.getHours(),
//       t.getMinutes()
//     );
//   };

//   useEffect(() => {
//     (async () => {
//       const data = await loadReminders();
//       setReminders(data);
//       setLoading(false);
//     })();
//   }, []);

//   const persist = async (items: Reminder[]) => {
//     setReminders(items);
//     await saveReminders(items);
//   };

//   const addReminder = async (item: {
//     title: string;
//     date: Date;
//     time: Date;
//     note: string;
//   }) => {
//     const newItem: Reminder = {
//       id: Date.now().toString(),
//       title: item.title,
//       date: item.date.toISOString(),
//       time: item.time.toISOString(),
//       note: item.note,
//       status: false,
//     };
//     await persist([newItem, ...reminders]);

//     // lên lịch notification
//     const dt = toDateTime(item.date.toISOString(), item.time.toISOString());
//     scheduleNotification(newItem.id, newItem.title, dt);
//   };

//   const deleteReminder = async (id: string) => {
//     const filtered = reminders.filter(r => r.id !== id);
//     await persist(filtered);
//     cancelNotification(id);
//   };

//   const updateReminder = async (
//     id: string,
//     data: { title: string; date: Date; time: Date; note: string }
//   ) => {
//     const updated = reminders.map(r =>
//       r.id === id
//         ? {
//             ...r,
//             title: data.title,
//             date: data.date.toISOString(),
//             time: data.time.toISOString(),
//             note: data.note,
//           }
//         : r
//     );
//     await persist(updated);

//     // hủy và lên lịch lại
//     cancelNotification(id);
//     const dt = toDateTime(data.date.toISOString(), data.time.toISOString());
//     scheduleNotification(id, data.title, dt);
//   };

//   const toggleStatus = async (id: string) => {
//     const updated = reminders.map(r =>
//       r.id === id ? { ...r, status: !r.status } : r
//     );
//     await persist(updated);
//   };

  

//   return {
//     reminders,
//     loading,
//     addReminder,
//     deleteReminder,
//     updateReminder,
//     toggleStatus,
//   };
// }


// src/hooks/useReminders.ts
// import { useEffect, useState } from 'react';
// import { loadReminders, saveReminders } from '../utils/storage';
// import { scheduleNotification, cancelNotification } from '../utils/notifications';

// export interface Reminder {
//   id: string;
//   title: string;
//   date: string; // ISO string
//   time: string; // ISO string
//   note: string;
//   status: boolean;
// }

// export function useReminders() {
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Helper: ghép date + time thành Date object
//   const toDateTime = (dateISO: string, timeISO: string) => {
//     const d = new Date(dateISO);
//     const t = new Date(timeISO);
//     return new Date(
//       d.getFullYear(),
//       d.getMonth(),
//       d.getDate(),
//       t.getHours(),
//       t.getMinutes()
//     );
//   };

//   // Load từ storage
//   const loadAll = async () => {
//     const data = await loadReminders();
//     const normalized = data.map(r => ({
//       ...r,
//       note: r.note ?? '',
//       status: typeof r.status === 'boolean' ? r.status : false,
//     }));
//     setReminders(normalized);
//   };

//   useEffect(() => {
//     (async () => {
//       await loadAll();
//       setLoading(false);
//     })();
//   }, []);

//   // Persist lên storage
//   const persist = async (items: Reminder[]) => {
//     setReminders(items);
//     await saveReminders(items);
//   };

//   // Thêm mới
//   const addReminder = async (item: {
//     title: string;
//     date: Date;
//     time: Date;
//     note: string;
//   }) => {
//     const id = Date.now().toString();
//     const newItem: Reminder = {
//       id,
//       title: item.title,
//       date: item.date.toISOString(),
//       time: item.time.toISOString(),
//       note: item.note,
//       status: false,
//     };

//     // Lưu và schedule notification
//     await persist([newItem, ...reminders]);
//     const dt = toDateTime(newItem.date, newItem.time);
//     await scheduleNotification(id, newItem.title, dt);
//   };

//   // Xoá
//   const deleteReminder = async (id: string) => {
//     await persist(reminders.filter(r => r.id !== id));
//     await cancelNotification(id);
//   };

//   // Cập nhật
//   const updateReminder = async (
//     id: string,
//     data: { title: string; date: Date; time: Date; note: string }
//   ) => {
//     const updated = reminders.map(r =>
//       r.id === id
//         ? {
//             ...r,
//             title: data.title,
//             date: data.date.toISOString(),
//             time: data.time.toISOString(),
//             note: data.note,
//           }
//         : r
//     );
//     await persist(updated);

//     // Hủy và schedule lại notification
//     await cancelNotification(id);
//     const dt = toDateTime(data.date.toISOString(), data.time.toISOString());
//     await scheduleNotification(id, data.title, dt);
//   };

//   // Đổi trạng thái done/pending
//   const toggleStatus = async (id: string) => {
//     const updated = reminders.map(r =>
//       r.id === id ? { ...r, status: !r.status } : r
//     );
//     await persist(updated);
//   };

//   // Refresh control
//   const refreshReminders = async () => {
//     setRefreshing(true);
//     await loadAll();
//     setRefreshing(false);
//   };

//   return {
//     reminders,
//     loading,
//     refreshing,
//     addReminder,
//     deleteReminder,
//     updateReminder,
//     toggleStatus,
//     refreshReminders,
//   };
// }

