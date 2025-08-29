import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageItem } from '../message-item/message-item';
import { Chat } from '../../../core/services/chat';
import { Auth } from '@angular/fire/auth';
import { ProfileService } from '../../../core/services/profileservice/profile';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MessageItem],
  templateUrl: './message-list.html',
  styleUrls: ['./message-list.scss']
})
export class MessageList implements OnInit {
  



  messages: any[] = [];
  currentUser = 'Prince 🤴🏻'; // baad me real auth se lenge
  private shouldScroll = false;
  constructor(private chatservice: Chat,
    private auth: Auth,
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    

    const user = this.auth.currentUser;
    if (!user) return;
    const senderUid = user!.uid;    // default user
    // const receiverUid = 'friendUid';  // default friend
    this.route.paramMap.subscribe(params => {
      let receiverUid = params.get('receiverUid');
      // ye reciver 
      // i.d fatech kr rha ha link se

      if (!receiverUid) {
        console.log("receicer id is not found");
        return;
      }
      
       console.log("Fetching messages for path:", `users/${senderUid}/chats/${receiverUid}/messages`);  
      this.chatservice.getMessages(senderUid, receiverUid).subscribe(data => {
        console.log("data is arriving");
        console.log(data);
        
        if (data.length === 0) {
          this.messages = data;
          


        }
        else {
          const newMsgs = data.filter(d => !this.messages.find(m => m.id === d.id));
          this.messages.push(...newMsgs);
          this.shouldScroll= true;
        }
 setTimeout(() => {
    const messageList = document.querySelector('.message-list') as HTMLElement;
    console.log("Before scroll:", messageList?.scrollTop, messageList?.scrollHeight);
    this.scrollToBottom();
    console.log("After scroll:", messageList?.scrollTop, messageList?.scrollHeight);
  }, 0);      });

    });
  
  }
  private scrollToBottom() {
  const messageList = document.querySelector('.message-list') as HTMLElement;
  if (messageList) {
    messageList.scrollTop = messageList.scrollHeight;
    console.log("Trying scrollToBottom →", {
      clientHeight: messageList.clientHeight,
      scrollHeight: messageList.scrollHeight,
      scrollTop: messageList.scrollTop
    });
  } else {
    console.log("⚠️ .message-list not found!");
  }
}



}
