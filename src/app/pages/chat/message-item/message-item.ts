import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.html',
  styleUrls: ['./message-item.scss']
})
export class MessageItem {
  @Input() message: any; // Firestore message object
  @Input() currentUser: string = 'Prince 🤴🏻'; // later replace with real auth user

  get isOwnMessage(): boolean {
    return this.message?.sender === this.currentUser;
  }
}
