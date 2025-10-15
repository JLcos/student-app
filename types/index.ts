export type UserRole = 'student' | 'teacher' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
  class?: string;
  onboardingCompleted: boolean;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  teacher?: string;
  schedule?: string;
}

export type Priority = 'low' | 'medium' | 'high';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'photo' | 'pdf' | 'link';
  url: string;
}

export interface Reminder {
  id: string;
  date: Date;
  time: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  subTasks: SubTask[];
  attachments: Attachment[];
  reminders: Reminder[];
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  activityId?: string;
  read: boolean;
  createdAt: Date;
}

export interface ProgressStats {
  completedToday: number;
  totalToday: number;
  completedThisWeek: number;
  totalThisWeek: number;
  lateActivities: number;
  studyTime?: number;
}

