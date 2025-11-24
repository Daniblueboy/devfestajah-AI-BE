export type Sender = 'user' | 'ai';

export interface Message {
  content: string;
  sender: Sender;
  timestamp: Date;
}
