import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export function userSignIn() {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
    .catch((error) => {
      console.error("Сталася помилка, спробуйте, будь ласка, ще раз.");
      console.error(error.message);
    });
}

export function userSignOut() {
  signOut(getAuth())
    .catch((error) => {
      console.error("Sign-out unsuccessful.");
      console.error(error.message);
    });
}