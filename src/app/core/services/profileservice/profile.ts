import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ref, Storage, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: Firestore, private auth: Auth, private storage: Storage) {}

  // ✅ Save or update profile
  async saveProfile(displayName: string, file: File | null) {
    const user = this.auth.currentUser;
    if (!user) throw new Error("User not logged in");

    let photoURL = '';

    if (file) {
      const fileRef = ref(this.storage, `profiles/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      photoURL = await getDownloadURL(fileRef);
    }

    // Update Firestore
    const userDocRef = doc(this.firestore, 'users', user.uid);
    await updateDoc(userDocRef, { displayName, photoURL });
  }

  // ✅ Fetch current user profile
  async getProfile() {
    const user = this.auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const userDocRef = doc(this.firestore, 'users', user.uid);
    const snapshot = await getDoc(userDocRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      return null;
    }
  }
  
 
}
export class Profile{}
