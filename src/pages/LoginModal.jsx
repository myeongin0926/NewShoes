import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Oval } from "react-loader-spinner";

const apiKey = import.meta.env.VITE_APP_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID;

const StyleLogin = styled.section`
  background: #00000030;
  backdrop-filter: blur(2px);
  z-index: 15;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all.2s;
  .loading-modal {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    padding: 50px;
    border-radius: 0 3px 40px 0;
    background-color: white;
    position: relative;
    .exit-btn {
      font-size: 40px;
      position: absolute;
      top: 0;
      right: 20px;
      cursor: pointer;
      color: var(--gray-700);
      transition: all.2s;
      &:hover {
        color: var(--gray-900);
      }
    }
    h3 {
      font-weight: 300;
      font-size: 50px;
      letter-spacing: 6px;
    }

    p {
      display: flex;
      gap: 10px;
      font-size: 19px;
      color: var(--gray-900);
      span {
        color: var(--positive);
        cursor: pointer;
      }
    }
  }
  & > div {
    display: flex;
  }

  article:first-child {
    border-radius: 40px 0 0 3px;
    width: 360px;
    padding: 0px 30px;
    background-color: #cae2fd;
    border-right: 1px solid var(--gray-500);
    background-image: url("/images/loginBackground.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;

const StyleForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  button {
    width: 100%;
    background-color: var(--positive);
    font-weight: 400;
    cursor: pointer;
    padding: 15px 0;
    color: var(--white);
    font-size: 18px;
    letter-spacing: 2px;
    border-radius: 3px;

    &:hover {
      background-color: var(--primary);
    }
  }

  .error-message {
    color: #ff8585;
    font-size: 14px;
    font-weight: 600;
  }
`;

const StyleInput = styled.input`
  width: 320px;
  height: 30px;
  border-bottom: 1px solid ${(props) => (props.error ? "red" : "var(--gray-700)")};
  outline: none;
  font-size: 16px;
  letter-spacing: 1px;
  padding-left: 2px;
  color: var(--gray-900);

  &:focus {
    border-color: var(--positive);
  }
`;

const StyleGoogleForm = styled.div`
  margin-top: 25px;

  div {
    height: 1px;
    width: 320px;
    background-color: var(--gray-700);
    position: relative;

    &:after {
      content: "OR";
      position: absolute;
      top: -11px;
      background-color: white;
      width: 50px;
      text-align: center;
      margin: 0 auto;
      left: 0;
      right: 0;
    }
  }

  button {
    cursor: pointer;
    margin-top: 30px;
    padding: 10px 12px;
    border: 1px solid var(--gray-500);
    width: 100%;
    display: flex;
    align-items: center;

    img {
      width: 25px;
    }

    span {
      text-align: center;
      flex: 1;
      font-size: 17px;
      color: var(--gray-700);
      font-weight: 500;
    }

    &:hover {
      background-color: var(--gray-100);
    }
  }
`;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

export default function LoginModal({ loginModalHandler }) {
  const [login, setLogin] = useState(true);
  const [id, setId] = useState({ text: "", error: "" });
  const [password, setPassword] = useState({ text: "", error: "" });
  const [passCheck, setPassCheck] = useState({ text: "", error: "" });
  const [name, setName] = useState({ text: "", error: "" });
  const [loading, setLoading] = useState(false);
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const passCheckInputRef = useRef();
  const nameInputRef = useRef();

  const firebaseConfig = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  console.log("current User", auth.currentUser);

  useEffect(() => {
    idInputRef.current.focus();
    setId(() => ({ text: "", error: "" }));
    setPassword(() => ({ text: "", error: "" }));
    setPassCheck(() => ({ text: "", error: "" }));
    setName(() => ({ text: "", error: "" }));
  }, [login]);

  const inputData = login
    ? [
        { label: "Email", value: id, type: "id", name: "id", ref: idInputRef },
        { label: "Password", value: password, type: "password", name: "password", ref: passwordInputRef },
      ]
    : [
        { label: "Email", value: id, type: "id", name: "id", ref: idInputRef },
        { label: "Name", value: name, type: "text", name: "name", ref: nameInputRef },
        { label: "Password", value: password, type: "password", name: "password", ref: passwordInputRef },
        { label: "Password Check", value: passCheck, type: "password", name: "passCheck", ref: passCheckInputRef },
      ];

  const handleLoginSignUp = () => {
    setLogin((pre) => !pre);
  };

  const authenticationErrorHandler = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
      case "auth/wrong-password": {
        setPassword({ text: "", error: "아이디 혹은 비밀번호를 확인해주세요" });
        return;
      }
      case "auth/email-already-in-use": {
        setId({ text: "", error: "이미 존재하는 아이디 입니다" });
        idInputRef.current.focus();
        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        if (!login) {
          const userCredential = await createUserWithEmailAndPassword(auth, id.text, password.text);
          await updateProfile(auth.currentUser, { displayName: name.text });
          loginModalHandler(false);
          setLoading(false);
        } else {
          const userCredential = await signInWithEmailAndPassword(auth, id.text, password.text);
          const user = userCredential.user;
          loginModalHandler(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        authenticationErrorHandler(error.code);
      }
    }
  };
  const resetForm = () => {
    setId((prevId) => ({ ...prevId, error: "" }));
    setPassword((prevPassword) => ({ ...prevPassword, error: "" }));
    setPassCheck((prevPassCheck) => ({ ...prevPassCheck, error: "" }));
    setName((prevPassCheck) => ({ ...prevPassCheck, error: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    resetForm();
    if (!validateEmail(id.text)) {
      setId((prevId) => ({ ...prevId, error: "아이디는 이메일 형식이어야 합니다" }));
      idInputRef.current.focus();
      isValid = false;
    } else if (!validatePassword(password.text)) {
      setPassword((prevId) => ({ ...prevId, error: "비밀번호는 8자 이상이어야 합니다" }));
      passwordInputRef.current.focus();
      isValid = false;
    } else if (!login && password.text !== passCheck.text) {
      passCheckInputRef.current.focus();
      setPassCheck(() => ({ text: "", error: "비밀번호가 일치하지 않습니다" }));
      isValid = false;
    } else if (!login && !/^[가-힣]{2,}$/.test(name.text)) {
      nameInputRef.current.focus();
      setName(() => ({ text: "", error: "올바른 이름을 입력해주세요" }));
      isValid = false;
    }
    return isValid;
  };

  console.log(id, password, passCheck, name);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "id":
        setId((prevId) => ({ ...prevId, text: value }));
        break;
      case "password":
        setPassword((prevPassword) => ({ ...prevPassword, text: value }));
        break;
      case "passCheck":
        setPassCheck((prevPassCheck) => ({ ...prevPassCheck, text: value }));
        break;
      default:
        setName((prevName) => ({ ...prevName, text: value }));
    }
  };

  return (
    <StyleLogin onClick={() => loginModalHandler(false)}>
      {loading && (
        <div className="loading-modal" onClick={(e) => e.stopPropagation()}>
          <Oval
            height={80}
            width={80}
            color="white"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#15ff00"
            strokeWidth={5}
            strokeWidthSecondary={5}
          />
        </div>
      )}
      <div onClick={(e) => e.stopPropagation()}>
        <article></article>
        <article className="form-box">
          <div className="exit-btn" onClick={() => loginModalHandler(false)}>
            &#215;
          </div>
          <h3>{login ? "Log In" : "Sign Up"}</h3>
          <p>
            {login ? "New to this site?" : "Already a member?"}{" "}
            <span onClick={handleLoginSignUp}>{login ? "Sign Up" : "Log In"}</span>
          </p>
          <StyleForm onSubmit={handleSubmit}>
            {inputData.map((el) => (
              <div key={el.name}>
                <label htmlFor={el.label}>{el.label}</label>
                <StyleInput
                  ref={el.ref}
                  onChange={handleInputChange}
                  value={el.value.text}
                  type={el.type}
                  name={el.name}
                  id={el.label}
                  error={el.error}
                />
                <span className="error-message">{el.value.error || ""} </span>
              </div>
            ))}
            <button type="submit">{login ? "Log In" : "Sign Up"}</button>
          </StyleForm>
          <StyleGoogleForm>
            <div></div>
            <button>
              <img src="/images/googleIcon.webp" alt="google logo" />
              <span>{login ? "Log in" : "Sign up"} with Google</span>
            </button>
          </StyleGoogleForm>
        </article>
      </div>
    </StyleLogin>
  );
}
