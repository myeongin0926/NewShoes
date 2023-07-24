import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
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

export default function Login({ loginModalHandler }) {
  const [login, setLogin] = useState(true);
  const [id, setId] = useState({ text: "", error: "" });
  const [password, setPassword] = useState({ text: "", error: "" });
  const [passCheck, setPassCheck] = useState({ text: "", error: "" });
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const passCheckInputRef = useRef();
  useEffect(() => {
    idInputRef.current.focus();
  }, [login]);
  const inputData = [
    { label: "Email", value: id, type: "id", name: "id", ref: idInputRef },
    { label: "Password", value: password, type: "password", name: "password", ref: passwordInputRef },
  ];

  const handleLoginSignUp = () => {
    setLogin((pre) => !pre);
    setId(() => ({ text: "", error: "" }));
    setPassword(() => ({ text: "", error: "" }));
    setPassCheck(() => ({ text: "", error: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLoginSignUp();
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!validateEmail(id.text)) {
      setId((prevId) => ({ ...prevId, error: "아이디는 이메일 형식이어야 합니다" }));
      setPassword((prevPassword) => ({ ...prevPassword, error: "" }));
      setPassCheck((prevPassCheck) => ({ ...prevPassCheck, error: "" }));
      idInputRef.current.focus();
      isValid = false;
    } else if (!validatePassword(password.text)) {
      passwordInputRef.current.focus();
      setId((prevId) => ({ ...prevId, error: "" }));
      setPassword((prevPassword) => ({ ...prevPassword, error: "비밀번호는 8자 이상이어야 합니다" }));
      setPassCheck((prevPassCheck) => ({ ...prevPassCheck, error: "" }));
      isValid = false;
    } else if (!login && password.text !== passCheck.text) {
      passCheckInputRef.current.focus();
      setId((prevId) => ({ ...prevId, error: "" }));
      setPassword((prevPassword) => ({ ...prevPassword, error: "" }));
      setPassCheck(() => ({ text: "", error: "비밀번호가 일치하지 않습니다" }));
      isValid = false;
    } else {
      setId((prevId) => ({ ...prevId, error: "" }));
      setPassword((prevPassword) => ({ ...prevPassword, error: "" }));
      setPassCheck((prevPassCheck) => ({ ...prevPassCheck, error: "" }));
    }

    return isValid;
  };

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
        break;
    }
  };

  return (
    <StyleLogin onClick={() => loginModalHandler(false)}>
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
            {!login && (
              <div>
                <label htmlFor={"password-check"}>Password Check</label>
                <StyleInput
                  onChange={handleInputChange}
                  value={passCheck.text}
                  type="password"
                  name="passCheck"
                  id="password-check"
                  ref={passCheckInputRef}
                  error={passCheck.error}
                />
                <span className="error-message">{passCheck.error || ""} </span>
              </div>
            )}
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
