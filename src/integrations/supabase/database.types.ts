
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
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          message?: string
          created_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          id: string
          service_type: string
          company_name: string | null
          contact_name: string
          email: string
          phone: string | null
          project_description: string | null
          budget_range: string | null
          timeline: string | null
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          service_type: string
          company_name?: string | null
          contact_name: string
          email: string
          phone?: string | null
          project_description?: string | null
          budget_range?: string | null
          timeline?: string | null
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          service_type?: string
          company_name?: string | null
          contact_name?: string
          email?: string
          phone?: string | null
          project_description?: string | null
          budget_range?: string | null
          timeline?: string | null
          created_at?: string
          status?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
