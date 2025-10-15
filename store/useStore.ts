import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Activity, Subject, Notification, ProgressStats } from '@/types';

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  toggleActivityComplete: (id: string) => void;
  
  // Subjects
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Progress Stats
  getProgressStats: () => ProgressStats;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
  // Initial user state
  user: null,
  setUser: (user) => set({ user }),

  // Activities
  activities: [],
  addActivity: (activity) =>
    set((state) => ({ activities: [...state.activities, activity] })),
  updateActivity: (id, updates) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),
  deleteActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== id),
    })),
  toggleActivityComplete: (id) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      ),
    })),

  // Subjects
  subjects: [
    { id: '1', name: 'Matemática', color: '#FF6B35' },
    { id: '2', name: 'Português', color: '#4ECDC4' },
    { id: '3', name: 'História', color: '#FFE66D' },
    { id: '4', name: 'Geografia', color: '#FF85C0' },
    { id: '5', name: 'Ciências', color: '#9B5DE5' },
    { id: '6', name: 'Inglês', color: '#00F5A0' },
  ],
  addSubject: (subject) =>
    set((state) => ({ subjects: [...state.subjects, subject] })),
  updateSubject: (id, updates) =>
    set((state) => ({
      subjects: state.subjects.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),
  deleteSubject: (id) =>
    set((state) => ({
      subjects: state.subjects.filter((s) => s.id !== id),
    })),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Progress Stats
  getProgressStats: () => {
    const state = get();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const todayActivities = state.activities.filter(
      (a) => a.dueDate >= today && a.dueDate <= todayEnd
    );

    const weekActivities = state.activities.filter(
      (a) => a.dueDate >= weekStart && a.dueDate <= todayEnd
    );

    const lateActivities = state.activities.filter(
      (a) => !a.completed && a.dueDate < today
    ).length;

    return {
      completedToday: todayActivities.filter((a) => a.completed).length,
      totalToday: todayActivities.length,
      completedThisWeek: weekActivities.filter((a) => a.completed).length,
      totalThisWeek: weekActivities.length,
      lateActivities,
    };
  },
    }),
    {
      name: 'student-app-storage', // nome da chave no localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        activities: state.activities,
        subjects: state.subjects,
        notifications: state.notifications,
      }),
    }
  )
);

