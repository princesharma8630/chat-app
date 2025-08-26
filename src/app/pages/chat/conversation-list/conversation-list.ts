import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { collection, Firestore, onSnapshot, query } from "@angular/fire/firestore";

export interface Conversation {
  id?: string; // firestore doc id (optional)
  participants: string[];
  lastMessage: string;
  updatedAt: any; // Firebase timestamp
}
@Component({
  selector: 'app-conversation-list',
  imports: [FormsModule , CommonModule],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.scss'
})
export class ConversationList{
   firestore = inject(Firestore);
  auth = inject(Auth);

  conversations = signal<Conversation[]>([]);

  ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) return;

    const colRef = collection(this.firestore, 'conversations');
    const q = query(colRef); // future: can add where('participants', 'array-contains', user.uid)

    onSnapshot(q, snapshot => {
      const convos: Conversation[] = [];
      snapshot.forEach(doc => convos.push({
        id: doc.id, ...(doc.data() as Conversation),
        participants: []
      }));
      this.conversations.set(convos);
    });
  }

}
