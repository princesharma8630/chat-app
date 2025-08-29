import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.html',
  styleUrls: ['./message-item.scss']
})
export class MessageItem implements OnInit {
  @Input() message: any;
  @Input() currentUser: string = '';
  
  currentUserId: string = '';
  isOwnMessage: boolean = false;
  displayName: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.currentUserId = this.auth.currentUser?.uid || '';
    this.isOwnMessage = this.message?.sender === this.currentUserId;
    
    console.log('Message sender:', this.message?.sender);
    console.log('Current user:', this.currentUserId);
    console.log('Is own message:', this.isOwnMessage);

    try {
      if (this.isOwnMessage) {
        this.displayName = 'You';
      } else {
        // Fetch user profile directly from Firestore
        const senderUid = this.message?.sender;
        
        if (senderUid) {
          // Query the users collection using sender UID
          const userDocRef = doc(this.firestore, 'users', senderUid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            this.displayName = userData['displayName'] || userData['name'] || 'Unknown User';
          } else {
            this.displayName = 'Unknown User';
          }
        } else {
          this.displayName = 'Unknown User';
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      this.displayName = this.isOwnMessage ? 'You' : 'Unknown User';
    }
  }
}