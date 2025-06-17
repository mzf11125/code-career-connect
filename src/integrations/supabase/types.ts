export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          learner_id: string
          mentor_id: string
          status: string
          title: string
          unread_count_learner: number | null
          unread_count_mentor: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          learner_id: string
          mentor_id: string
          status?: string
          title?: string
          unread_count_learner?: number | null
          unread_count_mentor?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          learner_id?: string
          mentor_id?: string
          status?: string
          title?: string
          unread_count_learner?: number | null
          unread_count_mentor?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          course_id: string
          enrolled_at: string
          id: string
          learner_id: string
          progress_percentage: number | null
          status: string
        }
        Insert: {
          course_id: string
          enrolled_at?: string
          id?: string
          learner_id: string
          progress_percentage?: number | null
          status?: string
        }
        Update: {
          course_id?: string
          enrolled_at?: string
          id?: string
          learner_id?: string
          progress_percentage?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          created_at: string
          id: string
          module_id: string
          progress_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          module_id: string
          progress_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          module_id?: string
          progress_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          content: Json
          created_at: string
          description: string | null
          id: string
          title: string
          topic: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          description?: string | null
          id?: string
          title: string
          topic: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          topic?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company: string
          created_at: string
          description: string | null
          external_id: string | null
          id: string
          is_active: boolean | null
          job_type: string | null
          location: string
          posted_date: string | null
          requirements: string | null
          responsibilities: string | null
          salary_range: string | null
          skills: string[] | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location: string
          posted_date?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          skills?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location?: string
          posted_date?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          skills?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      mentor_requests: {
        Row: {
          created_at: string
          id: string
          learner_id: string
          mentor_id: string
          message: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          learner_id: string
          mentor_id: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          learner_id?: string
          mentor_id?: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      mentors: {
        Row: {
          availability_schedule: Json | null
          bio: string | null
          created_at: string
          expertise: string[] | null
          hourly_rate: number | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          rating: number | null
          review_count: number | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          availability_schedule?: Json | null
          bio?: string | null
          created_at?: string
          expertise?: string[] | null
          hourly_rate?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          rating?: number | null
          review_count?: number | null
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          availability_schedule?: Json | null
          bio?: string | null
          created_at?: string
          expertise?: string[] | null
          hourly_rate?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          rating?: number | null
          review_count?: number | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_session_id: string
          content: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          chat_session_id: string
          content: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          chat_session_id?: string
          content?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_session_id_fkey"
            columns: ["chat_session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      resume_enhancements: {
        Row: {
          completed_at: string | null
          created_at: string
          enhanced_content: Json | null
          enhancement_type: string
          id: string
          original_content: Json
          resume_id: string
          status: string | null
          user_id: string
          user_prompt: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          enhanced_content?: Json | null
          enhancement_type: string
          id?: string
          original_content: Json
          resume_id: string
          status?: string | null
          user_id: string
          user_prompt?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          enhanced_content?: Json | null
          enhancement_type?: string
          id?: string
          original_content?: Json
          resume_id?: string
          status?: string | null
          user_id?: string
          user_prompt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_enhancements_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "user_resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_templates: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_ats_friendly: boolean | null
          name: string
          template_data: Json
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_ats_friendly?: boolean | null
          name: string
          template_data: Json
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_ats_friendly?: boolean | null
          name?: string
          template_data?: Json
          updated_at?: string
        }
        Relationships: []
      }
      resume_versions: {
        Row: {
          changes_summary: string | null
          content: Json
          created_at: string
          created_by_ai: boolean | null
          id: string
          resume_id: string
          version_number: number
        }
        Insert: {
          changes_summary?: string | null
          content: Json
          created_at?: string
          created_by_ai?: boolean | null
          id?: string
          resume_id: string
          version_number: number
        }
        Update: {
          changes_summary?: string | null
          content?: Json
          created_at?: string
          created_by_ai?: boolean | null
          id?: string
          resume_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "resume_versions_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "user_resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          duration_minutes: number
          id: string
          learner_id: string
          meet_link: string | null
          mentor_id: string
          notes: string | null
          scheduled_at: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number
          id?: string
          learner_id: string
          meet_link?: string | null
          mentor_id: string
          notes?: string | null
          scheduled_at: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          id?: string
          learner_id?: string
          meet_link?: string | null
          mentor_id?: string
          notes?: string | null
          scheduled_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_resumes: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_primary: boolean | null
          template_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          is_primary?: boolean | null
          template_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_primary?: boolean | null
          template_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_resumes_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "resume_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { _user_id: string; _role: string }
        Returns: boolean
      }
      upsert_job: {
        Args: {
          p_external_id: string
          p_title: string
          p_company: string
          p_location: string
          p_job_type: string
          p_description: string
          p_posted_date: string
          p_url: string
          p_skills: string[]
          p_responsibilities: string
          p_requirements: string
          p_salary_range: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "mentor" | "learner" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["mentor", "learner", "student"],
    },
  },
} as const
