import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import app from '../firebase'; 


export const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence)
.then(() => {
    console.log("Persistence is set to 'LOCAL'");
})
.catch((error) => {
    console.error("Error setting persistence: ", error);
});

export async function signUp(email: string, password: string): Promise<User | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error);
    return null;
  }
}


export async function signIn(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.providerId)
    return userCredential.user !== null;
  } catch (error) {
    console.error("Error signing in: ", error);
    return false;
  }
}

export async function signOutUser(): Promise<boolean> {
  try {
    await signOut(auth);
    
    
    return true;
  } catch (error) {
    console.error("Error signing out: ", error);
    return false;
  }
}
