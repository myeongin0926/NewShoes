import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
const apiKey = import.meta.env.VITE_APP_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
const databaseURL = import.meta.env.VITE_APP_FIREBASE_DATABASE_URL;
const appId = import.meta.env.VITE_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  databaseURL,
  apiKey,
  authDomain,
  projectId,
  appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const googleLogin = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      return result.user;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const emailLogin = async (setLoading, loginModalHandler, login, form, idInputRef, passwordInputRef, setForm) => {
  const { id, password, name } = form;
  setLoading(true);
  try {
    if (!login) {
      const userCredential = await createUserWithEmailAndPassword(auth, id.text, password.text);
      await updateProfile(auth.currentUser, { displayName: name.text });
      loginModalHandler(false);
      setLoading(false);
      return userCredential.user;
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, id.text, password.text);
      loginModalHandler(false);
      setLoading(false);
      console.log(userCredential.user);
      return userCredential.user;
    }
  } catch (error) {
    setLoading(false);
    authenticationErrorHandler(error.code, setForm, idInputRef, passwordInputRef);
  }
};

const authenticationErrorHandler = (errorCode, setForm, idInputRef, passwordInputRef) => {
  switch (errorCode) {
    case "auth/user-not-found":
    case "auth/wrong-password": {
      setForm((prevForm) => ({
        ...prevForm,
        password: { text: "", error: "아이디 혹은 비밀번호를 확인해주세요" },
      }));
      passwordInputRef.current.focus();
      return;
    }
    case "auth/email-already-in-use": {
      setForm((prevForm) => ({
        ...prevForm,
        id: { text: "", error: "이미 존재하는 아이디 입니다" },
      }));
      idInputRef.current.focus();
      return;
    }
  }
};

export const logout = () => {
  return signOut(auth);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
