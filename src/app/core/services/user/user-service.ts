import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private firestore:Firestore){}

  async getUserNameById(uid: string) {
       const userRef = doc(this.firestore, `users/${uid}`);
       const userSnap = await getDoc(userRef);
       if (userSnap.exists()) {
        
        return (userSnap.data() as any).displayName; 
       } else {
        return 'Unknown User';
       }
  }
}

