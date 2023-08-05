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
import { v4 as uuid } from "uuid";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
import { notifySuccess } from "../Components/toast/Notify";
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
const database = getDatabase(app);

export const googleLogin = () => {
  return signInWithPopup(auth, provider).then((result) => {
    return result.user;
  });
};

export const emailLogin = async (
  setLoading,
  loginModalHandler,
  login,
  form,
  idInputRef,
  passwordInputRef,
  setForm
) => {
  const { id, password, name } = form;
  setLoading(true);
  try {
    if (!login) {
      const userCredential = await createUserWithEmailAndPassword(auth, id.text, password.text);
      await updateProfile(auth.currentUser, { displayName: name.text });
      loginModalHandler(false);
      setLoading(false);
      notifySuccess("회원가입이 완료되었습니다.");
      return userCredential.user;
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, id.text, password.text);
      loginModalHandler(false);
      setLoading(false);
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

export async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, images) {
  const id = uuid();
  console.log(images);
  set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    mainImage: images[0],
    subImage: images[1],
    options: product.options.split(","),
  });
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(userId, product, selectedOption) {
  return set(ref(database, `carts/${userId}/${product.id + selectedOption}`), product);
}

export async function removeFromCart(userId, productId, option) {
  return remove(ref(database, `carts/${userId}/${productId + option}`));
}

export async function paymentCart(userId) {
  return remove(ref(database, `carts/${userId}`));
}
