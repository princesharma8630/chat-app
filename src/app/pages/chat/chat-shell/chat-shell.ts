import { Component } from '@angular/core';
import { ConversationList } from '../conversation-list/conversation-list';
import { MessageList } from '../message-list/message-list';
import { MessageInput } from '../message-input/message-input';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat-shell',
  imports: [ConversationList, MessageList, MessageInput, CommonModule,RouterModule , FormsModule],
  templateUrl: './chat-shell.html',
  styleUrl: './chat-shell.scss'
})
export class ChatShell {
  username ='';
  photoUrl ='';
  constructor(private firestore :Firestore , private auth:Auth){}
  ngOnInit(){
     const user = this.auth.currentUser;
    if (user) {
      const userDoc = doc(this.firestore, 'users', user.uid);
      docData(userDoc).subscribe((data: any) => {
        this.username = data.displayName;
        this.photoUrl = data.photoURL;
      });
  }

}}
