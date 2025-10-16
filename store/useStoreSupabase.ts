import { create } from 'zustand';
import { User, Activity, Subject, Notification, ProgressStats } from '@/types';
import { supabase } from '@/lib/supabase';
import * as queries from '@/lib/supabase-queries';

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  loadUser: (userId: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  
  // Activities
  activities: Activity[];
  loadActivities: () => Promise<void>;
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => Promise<void>;
  updateActivity: (id: string, activity: Partial<Activity>) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  toggleActivityComplete: (id: string) => Promise<void>;
  
  // Subjects
  subjects: Subject[];
  loadSubjects: () => Promise<void>;
  addSubject: (subject: Omit<Subject, 'id'>) => Promise<void>;
  updateSubject: (id: string, subject: Partial<Subject>) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
  
  // Notifications
  notifications: Notification[];
  loadNotifications: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  clearNotifications: () => Promise<void>;
  
  // Progress Stats
  getProgressStats: () => ProgressStats;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

export const useStoreSupabase = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  activities: [],
  subjects: [],
  notifications: [],
  isLoading: false,
  error: null,

  // User methods
  setUser: (user) => set({ user }),
  
  loadUser: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await queries.getUserById(userId);
      set({ user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateUserProfile: async (updates) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.role) dbUpdates.role = updates.role;
      if (updates.photo !== undefined) dbUpdates.photo = updates.photo;
      if (updates.class !== undefined) dbUpdates.class = updates.class;
      if (updates.onboardingCompleted !== undefined) {
        dbUpdates.onboarding_completed = updates.onboardingCompleted;
      }

      const updatedUser = await queries.updateUser(user.id, dbUpdates);
      set({ user: updatedUser, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Activity methods
  loadActivities: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const activities = await queries.getActivitiesByUserId(user.id);
      set({ activities, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addActivity: async (activity) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const dbActivity = {
        user_id: user.id,
        subject_id: activity.subjectId,
        title: activity.title,
        description: activity.description || null,
        due_date: activity.dueDate.toISOString(),
        priority: activity.priority,
        completed: activity.completed,
      };

      const newActivity = await queries.createActivity(dbActivity, activity.subTasks);
      set((state) => ({
        activities: [...state.activities, newActivity],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateActivity: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const dbUpdates: any = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.subjectId) dbUpdates.subject_id = updates.subjectId;
      if (updates.dueDate) dbUpdates.due_date = updates.dueDate.toISOString();
      if (updates.priority) dbUpdates.priority = updates.priority;
      if (updates.completed !== undefined) dbUpdates.completed = updates.completed;

      const updatedActivity = await queries.updateActivity(id, dbUpdates);
      set((state) => ({
        activities: state.activities.map((a) =>
          a.id === id ? updatedActivity : a
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteActivity: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await queries.deleteActivity(id);
      set((state) => ({
        activities: state.activities.filter((a) => a.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  toggleActivityComplete: async (id) => {
    const { activities } = get();
    const activity = activities.find((a) => a.id === id);
    if (!activity) return;

    set({ isLoading: true, error: null });
    try {
      const updatedActivity = await queries.toggleActivityComplete(id, !activity.completed);
      set((state) => ({
        activities: state.activities.map((a) =>
          a.id === id ? updatedActivity : a
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Subject methods
  loadSubjects: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const subjects = await queries.getSubjectsByUserId(user.id);
      set({ subjects, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSubject: async (subject) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const dbSubject = {
        user_id: user.id,
        name: subject.name,
        color: subject.color,
        teacher: subject.teacher || null,
        schedule: subject.schedule || null,
      };

      const newSubject = await queries.createSubject(dbSubject);
      set((state) => ({
        subjects: [...state.subjects, newSubject],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateSubject: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.color) dbUpdates.color = updates.color;
      if (updates.teacher !== undefined) dbUpdates.teacher = updates.teacher;
      if (updates.schedule !== undefined) dbUpdates.schedule = updates.schedule;

      const updatedSubject = await queries.updateSubject(id, dbUpdates);
      set((state) => ({
        subjects: state.subjects.map((s) =>
          s.id === id ? updatedSubject : s
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteSubject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await queries.deleteSubject(id);
      set((state) => ({
        subjects: state.subjects.filter((s) => s.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Notification methods
  loadNotifications: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const notifications = await queries.getNotificationsByUserId(user.id);
      set({ notifications, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addNotification: async (notification) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const dbNotification = {
        user_id: user.id,
        activity_id: notification.activityId || null,
        title: notification.title,
        message: notification.message,
        read: notification.read,
      };

      const newNotification = await queries.createNotification(dbNotification);
      set((state) => ({
        notifications: [...state.notifications, newNotification],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  markNotificationRead: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await queries.markNotificationRead(id);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearNotifications: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      await queries.clearNotifications(user.id);
      set({ notifications: [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Progress Stats (computed locally)
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
}));
