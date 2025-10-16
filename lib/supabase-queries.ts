import { supabase } from './supabase';
import { Activity, Subject, Notification, User } from '@/types';
import { Database } from '@/types/supabase';

type DbActivity = Database['public']['Tables']['activities']['Row'];
type DbSubject = Database['public']['Tables']['subjects']['Row'];
type DbNotification = Database['public']['Tables']['notifications']['Row'];
type DbUser = Database['public']['Tables']['users']['Row'];

// ========== USER QUERIES ==========

export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return dbUserToUser(data);
}

export async function createUser(user: Omit<DbUser, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();

  if (error) throw error;
  return dbUserToUser(data);
}

export async function updateUser(userId: string, updates: Partial<DbUser>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return dbUserToUser(data);
}

// ========== SUBJECT QUERIES ==========

export async function getSubjectsByUserId(userId: string) {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data.map(dbSubjectToSubject);
}

export async function createSubject(subject: Omit<DbSubject, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('subjects')
    .insert(subject)
    .select()
    .single();

  if (error) throw error;
  return dbSubjectToSubject(data);
}

export async function updateSubject(subjectId: string, updates: Partial<DbSubject>) {
  const { data, error } = await supabase
    .from('subjects')
    .update(updates)
    .eq('id', subjectId)
    .select()
    .single();

  if (error) throw error;
  return dbSubjectToSubject(data);
}

export async function deleteSubject(subjectId: string) {
  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', subjectId);

  if (error) throw error;
}

// ========== ACTIVITY QUERIES ==========

export async function getActivitiesByUserId(userId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      subtasks (*),
      attachments (*),
      reminders (*)
    `)
    .eq('user_id', userId)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data.map(dbActivityToActivity);
}

export async function createActivity(activity: Omit<DbActivity, 'id' | 'created_at' | 'updated_at'>, subtasks?: any[]) {
  const { data, error } = await supabase
    .from('activities')
    .insert(activity)
    .select()
    .single();

  if (error) throw error;

  // Insert subtasks if provided
  if (subtasks && subtasks.length > 0) {
    const subtasksToInsert = subtasks.map((st, index) => ({
      activity_id: data.id,
      title: st.title,
      completed: st.completed || false,
      position: index,
    }));

    await supabase.from('subtasks').insert(subtasksToInsert);
  }

  // Fetch the complete activity with relations
  const { data: completeActivity } = await supabase
    .from('activities')
    .select(`
      *,
      subtasks (*),
      attachments (*),
      reminders (*)
    `)
    .eq('id', data.id)
    .single();

  return dbActivityToActivity(completeActivity!);
}

export async function updateActivity(activityId: string, updates: Partial<DbActivity>) {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', activityId)
    .select(`
      *,
      subtasks (*),
      attachments (*),
      reminders (*)
    `)
    .single();

  if (error) throw error;
  return dbActivityToActivity(data);
}

export async function deleteActivity(activityId: string) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId);

  if (error) throw error;
}

export async function toggleActivityComplete(activityId: string, completed: boolean) {
  return updateActivity(activityId, { completed });
}

// ========== SUBTASK QUERIES ==========

export async function updateSubtask(subtaskId: string, completed: boolean) {
  const { error } = await supabase
    .from('subtasks')
    .update({ completed })
    .eq('id', subtaskId);

  if (error) throw error;
}

// ========== NOTIFICATION QUERIES ==========

export async function getNotificationsByUserId(userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(dbNotificationToNotification);
}

export async function createNotification(notification: Omit<DbNotification, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .single();

  if (error) throw error;
  return dbNotificationToNotification(data);
}

export async function markNotificationRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) throw error;
}

export async function clearNotifications(userId: string) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
}

// ========== TYPE CONVERTERS ==========

function dbUserToUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    role: dbUser.role,
    photo: dbUser.photo || undefined,
    class: dbUser.class || undefined,
    onboardingCompleted: dbUser.onboarding_completed,
  };
}

function dbSubjectToSubject(dbSubject: DbSubject): Subject {
  return {
    id: dbSubject.id,
    name: dbSubject.name,
    color: dbSubject.color,
    teacher: dbSubject.teacher || undefined,
    schedule: dbSubject.schedule || undefined,
  };
}

function dbActivityToActivity(dbActivity: any): Activity {
  return {
    id: dbActivity.id,
    title: dbActivity.title,
    description: dbActivity.description || '',
    subjectId: dbActivity.subject_id,
    dueDate: new Date(dbActivity.due_date),
    priority: dbActivity.priority,
    completed: dbActivity.completed,
    subTasks: dbActivity.subtasks?.map((st: any) => ({
      id: st.id,
      title: st.title,
      completed: st.completed,
    })) || [],
    attachments: dbActivity.attachments?.map((att: any) => ({
      id: att.id,
      name: att.name,
      type: att.type,
      url: att.url,
    })) || [],
    reminders: dbActivity.reminders?.map((rem: any) => ({
      id: rem.id,
      date: new Date(rem.reminder_date),
      time: rem.reminder_time,
    })) || [],
    createdAt: new Date(dbActivity.created_at),
  };
}

function dbNotificationToNotification(dbNotification: DbNotification): Notification {
  return {
    id: dbNotification.id,
    title: dbNotification.title,
    message: dbNotification.message,
    activityId: dbNotification.activity_id || undefined,
    read: dbNotification.read,
    createdAt: new Date(dbNotification.created_at),
  };
}
