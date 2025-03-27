// types/messaging.ts
export interface Conversation {
  id: number;
  participants: Array<{
    id: number;
    username: string;
    profile_picture?: string;
  }>;
  last_message?: {
    content: string;
    created_at: string;
    is_read: boolean;
  };
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation: number;
  sender: number;
  sender_username: string;
  sender_profile_picture?: string;
  content: string;
  attachments: Array<{
    id: number;
    file: string;
    file_name: string;
    file_type: string;
    file_size: number;
  }>;
  is_read: boolean;
  created_at: string;
}

export interface MessageCreateData {
  content: string;
  attachments?: File[];
}

export interface ConversationCreateData {
  recipient_id: number;
  initial_message: string;
}