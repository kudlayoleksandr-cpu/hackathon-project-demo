/**
 * Database Types for Supabase
 * These types match the database schema defined in supabase/schema.sql
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'student' | 'applicant' | 'admin'
export type OrderStatus = 'pending' | 'paid' | 'delivered' | 'completed' | 'cancelled' | 'refunded'
export type OfferType = 'written_review' | 'video_call' | 'chat_session'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: UserRole
          bio: string | null
          university: string | null
          study_program: string | null
          country: string | null
          avatar_url: string | null
          stripe_customer_id: string | null
          stripe_account_id: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: UserRole
          bio?: string | null
          university?: string | null
          study_program?: string | null
          country?: string | null
          avatar_url?: string | null
          stripe_customer_id?: string | null
          stripe_account_id?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: UserRole
          bio?: string | null
          university?: string | null
          study_program?: string | null
          country?: string | null
          avatar_url?: string | null
          stripe_customer_id?: string | null
          stripe_account_id?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          offer_type: OfferType
          price: number
          delivery_days: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          offer_type?: OfferType
          price: number
          delivery_days?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          offer_type?: OfferType
          price?: number
          delivery_days?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          applicant_id: string
          seller_id: string
          offer_id: string
          status: OrderStatus
          amount: number
          platform_fee: number
          seller_amount: number
          stripe_payment_intent_id: string | null
          stripe_transfer_id: string | null
          content: string | null
          meeting_link: string | null
          delivered_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          applicant_id: string
          seller_id: string
          offer_id: string
          status?: OrderStatus
          amount: number
          platform_fee: number
          seller_amount: number
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          content?: string | null
          meeting_link?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          applicant_id?: string
          seller_id?: string
          offer_id?: string
          status?: OrderStatus
          amount?: number
          platform_fee?: number
          seller_amount?: number
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          content?: string | null
          meeting_link?: string | null
          delivered_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      universities: {
        Row: {
          id: string
          name: string
          country: string
          city: string
          logo_url: string | null
          website: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          country: string
          city: string
          logo_url?: string | null
          website?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string
          city?: string
          logo_url?: string | null
          website?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          order_id: string
          reviewer_id: string
          reviewed_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          reviewer_id: string
          reviewed_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          reviewer_id?: string
          reviewed_id?: string
          rating?: number
          comment?: string | null
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
      user_role: UserRole
      order_status: OrderStatus
      offer_type: OfferType
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Offer = Database['public']['Tables']['offers']['Row']
export type OfferInsert = Database['public']['Tables']['offers']['Insert']
export type OfferUpdate = Database['public']['Tables']['offers']['Update']

export type Order = Database['public']['Tables']['orders']['Row']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']

export type University = Database['public']['Tables']['universities']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']

// Extended types with relations
export interface OfferWithUser extends Offer {
  users: User
}

export interface OrderWithDetails extends Order {
  offers: Offer
  applicant: User
  seller: User
}

