import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private _auth = inject(Auth);

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }
}
