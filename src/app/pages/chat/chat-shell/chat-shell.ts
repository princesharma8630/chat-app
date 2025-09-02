import { Component, NgModule } from '@angular/core';
import { ConversationList } from '../conversation-list/conversation-list';
import { MessageList } from '../message-list/message-list';
import { MessageInput } from '../message-input/message-input';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../core/services/profileservice/profile';
import { UserList } from '../user-list/user-list';
import { ReceiverP } from '../receiver-p/receiver-p';


@Component({
  selector: 'app-chat-shell',
  imports: [ ConversationList,MessageList, MessageInput, CommonModule,RouterModule , FormsModule , ReceiverP ],
  templateUrl: './chat-shell.html',
  styleUrl: './chat-shell.scss'
})
export class ChatShell {
   profile:any=null;
   photoUrl:any=null;
  constructor(private firestore :Firestore ,
     private auth:Auth , 
     private profileService:ProfileService ,
      private routes :Router,
    ){}
  async ngOnInit(){
    try {
    this.profile = await this.profileService.getProfile();
    console.log('Current user profile:', this.profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
  }
  }
  onUserList(){
    this.routes.navigate(['/userlist']);


}}
