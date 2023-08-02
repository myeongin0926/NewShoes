import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import LoadingModal from "../loading/LoadingModal";
import { googleLogin, emailLogin } from "../../api/firebase";
const StyleLogin = styled.section`
  background: var(--modal-back);
  z-index: 15;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all.2s;
  
  .form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 390px;
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
        transition: all.2s;
        &:hover{
          color: var(--primary);
        }
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

export default function LoginModal({ loginModalHandler, handleLogin }) {
  const [loginSwitch, setLoginSwitch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    id: { text: "", error: "" },
    password: { text: "", error: "" },
    passCheck: { text: "", error: "" },
    name: { text: "", error: "" },
  });
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const passCheckInputRef = useRef();
  const nameInputRef = useRef();

  useEffect(() => {
    idInputRef.current.focus();
    resetForm();
  }, [loginSwitch]);

  const inputData = loginSwitch
    ? [
        { label: "Email", name: "id", ref: idInputRef, type: "id" },
        { label: "Password", name: "password", ref: passwordInputRef, type: "password" },
      ]
    : [
        { label: "Email", name: "id", ref: idInputRef, type: "id" },
        { label: "Name", name: "name", ref: nameInputRef, type: "text" },
        { label: "Password", name: "password", ref: passwordInputRef, type: "password" },
        { label: "Password Check", name: "passCheck", ref: passCheckInputRef, type: "password" },
      ];

  const handleLoginSignUpSwitch = () => {
    setLoginSwitch((prevLogin) => !prevLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      emailLogin(setIsLoading, loginModalHandler, loginSwitch, form, idInputRef, passwordInputRef, setForm).then(
        (res) => {
          if (res) handleLogin(res) 
        }
      );
    }
  };
  const handleGoogleSubmit = () => {
    googleLogin()
      .then((res) => {
        loginModalHandler(false);
        handleLogin(res);
      })
      .catch((err) => console.log(err));
  };
  const resetForm = () => {
    setForm(() => ({
      id: { text: "", error: "" },
      password: { text: "", error: "" },
      passCheck: { text: "", error: "" },
      name: { text: "", error: "" },
    }));
  };

  const resetErrorForm = () => {
    setForm((pre) => ({
      id: { ...pre.id, error: "" },
      password: { ...pre.password, error: "" },
      passCheck: { ...pre.passCheck, error: "" },
      name: { ...pre.name, error: "" },
    }));
  };

  const validateForm = () => {
    let isValid = true;
    resetErrorForm();
    if (!validateEmail(form.id.text)) {
      setForm((prevForm) => ({
        ...prevForm,
        id: { text: "", error: "아이디는 이메일 형식이어야 합니다" },
      }));
      idInputRef.current.focus();
      isValid = false;
    } else if (!validatePassword(form.password.text)) {
      setForm((prevForm) => ({
        ...prevForm,
        password: { text: "", error: "비밀번호는 8자 이상이어야 합니다" },
      }));
      passwordInputRef.current.focus();
      isValid = false;
    } else if (!loginSwitch && form.password.text !== form.passCheck.text) {
      setForm((prevForm) => ({
        ...prevForm,
        passCheck: { text: "", error: "비밀번호가 일치하지 않습니다" },
      }));
      passCheckInputRef.current.focus();
      isValid = false;
    } else if (!loginSwitch && !/^[가-힣]{2,}$/.test(form.name.text)) {
      setForm((prevForm) => ({
        ...prevForm,
        name: { text: "", error: "올바른 이름을 입력해주세요" },
      }));
      nameInputRef.current.focus();
      isValid = false;
    }
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], text: value },
    }));
  };

  return (
    <StyleLogin onClick={() => loginModalHandler(false)}>
      {isLoading && <LoadingModal />}
      <div onClick={(e) => e.stopPropagation()}>
        <article></article>
        <article className="form-box">
          <div className="exit-btn" onClick={() => loginModalHandler(false)}>
            &#215;
          </div>
          <h3>{loginSwitch ? "Log In" : "Sign Up"}</h3>
          <p>
            {loginSwitch ? "New to this site?" : "Already a member?"}{" "}
            <span onClick={handleLoginSignUpSwitch}>{loginSwitch ? "Sign Up" : "Log In"}</span>
          </p>
          <StyleForm onSubmit={handleSubmit}>
            {inputData.map((el) => (
              <div key={el.name}>
                <label htmlFor={el.label}>{el.label}</label>
                <StyleInput
                  ref={el.ref}
                  onChange={handleInputChange}
                  value={form[el.name].text}
                  type={el.type}
                  name={el.name}
                  id={el.label}
                  error={form[el.name].error}
                />
                <span className="error-message">{form[el.name].error || ""} </span>
              </div>
            ))}
            <button type="submit">{loginSwitch ? "Log In" : "Sign Up"}</button>
          </StyleForm>
          {loginSwitch && (
            <StyleGoogleForm>
              <div></div>
              <button onClick={handleGoogleSubmit}>
                <img src="/images/googleIcon.webp" alt="google logo" />
                <span>Log in with Google</span>
              </button>
            </StyleGoogleForm>
          )}
        </article>
      </div>
    </StyleLogin>
  );
}
