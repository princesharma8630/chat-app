import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Chat } from '../../../core/services/chat';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.html',
  styleUrls: ['./message-input.scss']
})
export class MessageInput{
  newMessage: string = '';
  receiverUid :string |null=null;
  constructor(private chatservice:Chat 
    , private auth:Auth,
    private route: ActivatedRoute,
  
  ) {}
    
  async sendMessage() {
    this.route.paramMap.subscribe(params=>{
      this.receiverUid =params.get('receiverUid');
      console.log('messageinput -Receiver UID' , this.receiverUid);
    })
    if (!this.newMessage.trim()) return; // blank avoid

    try {
     const user = this.auth.currentUser;
     const senderUid= user!.uid;
    
      // const user = this.auth.currentUser;
      // if(!user) throw new Error("User not logged in");
      // const senderuid = user.uid;
      const senderuid ='prince pandit';
       await this.chatservice.sendMessage(this.newMessage ,senderUid, this.receiverUid as string);
      

      this.newMessage = ''; // reset inputj
    } catch (err) {
      console.error('Error sending message: ', err);
    }
  }
}
