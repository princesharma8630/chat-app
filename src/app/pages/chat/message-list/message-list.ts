import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageItem } from '../message-item/message-item';

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

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const messagesRef = collection(this.firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
    collectionData(q, { idField: 'id' }).subscribe(data => {
      this.messages = data;
    });
  }
}
