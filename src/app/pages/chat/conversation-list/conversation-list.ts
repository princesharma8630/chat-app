import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { 
  collection, 
  Firestore, 
  onSnapshot, 
  query, 
  doc, 
  getDoc,
  orderBy,
  limit,
  getDocs
} from "@angular/fire/firestore";
import { Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: any;
}

export interface Message {
  text: string;
  sender: string;
  createdAt: any;
}

export interface ConversationItem {
  userId: string;
  user: User | null;
  lastMessage: Message | null;
  lastMessageTime: any;
}

@Component({
  selector: 'app-conversation-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.scss'
})
export class ConversationList implements OnInit {
  constructor(private router: Router) {}
  firestore = inject(Firestore);
  auth = inject(Auth);
  
  conversations = signal<ConversationItem[]>([]);
  loading = signal<boolean>(true);
  
  ngOnInit() {
    this.loadConversations();
  }
  
  getCurrentUserId(): string {
    return localStorage.getItem('currentUserId') || '';
  }
  
  async loadConversations() {
    const currentUserId = this.getCurrentUserId();
    if (!currentUserId) {
      this.loading.set(false);
      return;
    }
    
    try {
      // Get all chats for current user
      const chatsRef = collection(this.firestore, `users`);
      const chatsSnapshot = await getDocs(chatsRef);
      console.log('chat snapshot', chatsSnapshot.size);
      
      const conversationPromises = chatsSnapshot.docs.map(async (chatDoc) => {
        const otherUserId = chatDoc.id;
        
        // Get user info
        const userDoc = await getDoc(doc(this.firestore, `users/${otherUserId}`));
        const user = userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as unknown as User : null;
        
        // Get last message
        const messagesRef = collection(this.firestore, `users/${currentUserId}/chats/${otherUserId}/messages`);
        const lastMessageQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));
        const lastMessageSnapshot = await getDocs(lastMessageQuery);
        
        let lastMessage: Message | null = null;
        let lastMessageTime: any = null;
        
        if (!lastMessageSnapshot.empty) {
          const lastMessageDoc = lastMessageSnapshot.docs[0];
          const messageData = lastMessageDoc.data() as Message;
          lastMessage = messageData;
          lastMessageTime = messageData.createdAt;
        }
        
        return {
          userId: otherUserId,
          user,
          lastMessage,
          lastMessageTime
        } as ConversationItem;
      });
      
      const conversationsData = await Promise.all(conversationPromises);
      
      // Sort by last message time (most recent first)
      conversationsData.sort((a, b) => {
        if (!a.lastMessageTime && !b.lastMessageTime) return 0;
        if (!a.lastMessageTime) return 1;
        if (!b.lastMessageTime) return -1;
        return b.lastMessageTime.toMillis() - a.lastMessageTime.toMillis();
      });
      
      this.conversations.set(conversationsData);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      this.loading.set(false);
    }
  }
  
  getDisplayName(user: User | null): string {
    if (!user) return 'Unknown User';
    return user.displayName || user.email;
  }
  
  getLastMessageText(message: Message | null): string {
    if (!message) return 'No messages yet';
    return message.text.length > 50 ? message.text.substring(0, 50) + '...' : message.text;
  }
  
  getLastMessageTime(time: any): string {
    if (!time) return '';
    
    const messageDate = time.toDate();
    const now = new Date();
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }
  
  openChat(conversation: ConversationItem) {
    if (!conversation.user) return;
    
    // Navigate to chat with this user
    console.log('Opening chat with user:', conversation.user.uid);
    
    this.router.navigate(['/chat', conversation.user.uid])
  }
  
  // Method to refresh conversations
  refreshConversations() {
    this.loading.set(true);
    this.loadConversations();
  }
  
  // TrackBy function for better performance
  trackByUserId(index: number, conversation: ConversationItem): string {
    return conversation.userId;
  }
}