import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { updateDoc } from '@angular/fire/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth, private storage: Storage, private firestore: Firestore, private router: Router) {}

  // login ke liye
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log("user logged in", userCredential.user.email, userCredential.user.uid);
      
      // 🔥 STORE USER ID IN SESSION STORAGE (tab-specific solution)
      sessionStorage.setItem('currentUserId', userCredential.user.uid);
      
      // Optional: user Firestore document fetch karna
      const userDoc = doc(this.firestore, 'users', userCredential.user.uid);
      console.log('📂 Firestore user document ref:', userDoc.path);

      // Redirect to chat or dashboard page
      this.router.navigate(['/chat']);
    }
    catch (err) {
      console.log("login failed:", err);
      throw err;
    }
  }

  // ✅ Ye function Signup ke liye hona chahiye
  async signUp(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log("✅ User created:", userCredential.user.uid);

    // 🔥 STORE USER ID IN SESSION STORAGE
    sessionStorage.setItem('currentUserId', userCredential.user.uid);

    // Firestore me user save karo
    await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: email,
      createdAt: new Date(),
    });

    console.log("🔥 User saved in Firestore:", userCredential.user.uid);
    this.router.navigate(['profile-setup']);
  }

  // update the profile
  async updateProfile(displayName: string, file: File | null) {
    const user = this.auth.currentUser;
    if (!user) throw new Error("User not logged in");

    let photoURL = '';

    // Upload file if exists
    if (file) {
      const fileRef = ref(this.storage, `profiles/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      photoURL = await getDownloadURL(fileRef);
    }

    // Update Firestore document
    await updateDoc(doc(this.firestore, 'users', user.uid), {
      displayName,
      photoURL
    });

    console.log('✅ Profile updated in Firestore:', user.uid);
  }

  // 🔥 NEW METHOD: Get current user ID from session storage (tab-specific)
  getCurrentUserId(): string {
    return sessionStorage.getItem('currentUserId') || '';
  }

  // 🔥 NEW METHOD: Logout and clear session
  async logout() {
    try {
      await signOut(this.auth);
      sessionStorage.removeItem('currentUserId'); // Clear session storage
      this.router.navigate(['/login']);
      console.log('✅ User logged out');
    } catch (err) {
      console.error('Logout failed:', err);
      throw err;
    }
  }
}

export { Auth };