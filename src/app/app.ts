import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit { // <-- implement OnInit
  protected readonly title = signal('chat-app');
  
  private auth = inject(Auth);

  async signUp(email : string , password:string){

    try{
      const userCredential = await createUserWithEmailAndPassword(this.auth , email , password);
      console.log('user created ' , userCredential);
      const user = userCredential.user;

      await setDoc(doc(this.firestore , 'users' , user.uid),{
        email:user.email,
        uid:user.uid,
        createdAt:new Date()
      });
      console.log('User created & saved in the fireStore :',user.uid);
    }
    catch(err){
      console.error('signUp failed' , err);
    }
  }



  firestore = inject(Firestore);

  async ngOnInit() {  // <-- Angular will now recognize this
    try {
      const colRef = collection(this.firestore, 'test');
      const snapshot = await getDocs(colRef);
      console.log('🔥 Firebase connected! Docs found:', snapshot.size);
    } catch (err) {
      console.error('❌ Firebase NOT connected:', err);
    }
      
  
  }


  async login(email:string , password:string){
    try{
      const userCredential= await signInWithEmailAndPassword(this.auth , email , password);
      const user = userCredential.user;
      console.log('user logged in' , user.uid , user.email);

    }
    catch(err){
      console.log('login failed' , err);
    }
  }
}
