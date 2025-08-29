import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserList implements OnInit {
getOnlineCount(_t42: any[]) {
throw new Error('Method not implemented.');
}
  users$!: Observable<any[]>;
  currentUid: string | null = null;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUid = this.auth.currentUser?.uid ?? null;

    const usersRef = collection(this.firestore, 'users');
    this.users$ = collectionData(usersRef, { idField: 'uid' }) as Observable<any[]>;
  }

  onUserSelect(user: any) {
    if (!user?.uid || user.uid === this.currentUid) return;
    // Navigate to chat with that receiver
    this.router.navigate(['/chat', user.uid]);
  }
}
