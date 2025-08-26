import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.html',
  styleUrls: ['./message-input.scss']
})
export class MessageInput{
  newMessage: string = '';

  constructor(private firestore: Firestore) {}

  async sendMessage() {
    if (!this.newMessage.trim()) return; // blank avoid

    try {
      const messagesRef = collection(this.firestore, 'messages');
      await addDoc(messagesRef, {
        text: this.newMessage,
        createdAt: serverTimestamp(),
        sender: 'Prince 🤴🏻' // TODO: later we replace with real auth user
      });

      this.newMessage = ''; // reset input
    } catch (err) {
      console.error('Error sending message: ', err);
    }
  }
}
