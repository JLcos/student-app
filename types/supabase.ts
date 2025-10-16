export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'student' | 'teacher' | 'parent'
          photo: string | null
          class: string | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: 'student' | 'teacher' | 'parent'
          photo?: string | null
          class?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'student' | 'teacher' | 'parent'
          photo?: string | null
          class?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          teacher: string | null
          schedule: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color: string
          teacher?: string | null
          schedule?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          teacher?: string | null
          schedule?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          subject_id: string
          title: string
          description: string | null
          due_date: string
          priority: 'low' | 'medium' | 'high'
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id: string
          title: string
          description?: string | null
          due_date: string
          priority: 'low' | 'medium' | 'high'
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string
          title?: string
          description?: string | null
          due_date?: string
          priority?: 'low' | 'medium' | 'high'
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subtasks: {
        Row: {
          id: string
          activity_id: string
          title: string
          completed: boolean
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          activity_id: string
          title: string
          completed?: boolean
          position?: number
          created_at?: string
        }
        Update: {
          id?: string
          activity_id?: string
          title?: string
          completed?: boolean
          position?: number
          created_at?: string
        }
      }
      attachments: {
        Row: {
          id: string
          activity_id: string
          name: string
          type: 'photo' | 'pdf' | 'link'
          url: string
          created_at: string
        }
        Insert: {
          id?: string
          activity_id: string
          name: string
          type: 'photo' | 'pdf' | 'link'
          url: string
          created_at?: string
        }
        Update: {
          id?: string
          activity_id?: string
          name?: string
          type?: 'photo' | 'pdf' | 'link'
          url?: string
          created_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          activity_id: string
          reminder_date: string
          reminder_time: string
          created_at: string
        }
        Insert: {
          id?: string
          activity_id: string
          reminder_date: string
          reminder_time: string
          created_at?: string
        }
        Update: {
          id?: string
          activity_id?: string
          reminder_date?: string
          reminder_time?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          activity_id: string | null
          title: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_id?: string | null
          title: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_id?: string | null
          title?: string
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
