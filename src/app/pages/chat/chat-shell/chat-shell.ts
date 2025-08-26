import { Component } from '@angular/core';
import { ConversationList } from '../conversation-list/conversation-list';
import { MessageList } from '../message-list/message-list';
import { MessageInput } from '../message-input/message-input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-shell',
  imports: [ConversationList, MessageList, MessageInput, CommonModule],
  templateUrl: './chat-shell.html',
  styleUrl: './chat-shell.scss'
})
export class ChatShell {

}
