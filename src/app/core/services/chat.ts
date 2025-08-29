import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Chat {
  private firestore: Firestore = inject(Firestore);
  
  constructor(){

  }

  async sendMessage(text:string , senderUid:string ,receiverUid: string ){

      // path for sender 
 const senderRef = collection(this.firestore ,`users/${senderUid}/chats/${receiverUid}/messages` );
//  path for reciever
  const receiverRef = collection(this.firestore, `users/${receiverUid}/chats/${senderUid}/messages`);
  const msgData ={
    text,
    sender:senderUid,
    createdAt:serverTimestamp(),

  };

  await addDoc(senderRef , msgData);
  console.log("message added sender");
  await addDoc(receiverRef , msgData);
  console.log("messae add receiver");
  }
    getMessages(senderUid: string, receiverUid: string): Observable<any[]> {
  const messagesRef = collection(this.firestore, `users/${receiverUid}/chats/${senderUid}/messages`);
 
  const q = query(messagesRef, orderBy('createdAt'));
  return collectionData(q, { idField: 'id' }) as Observable<any[]>;
}
}

