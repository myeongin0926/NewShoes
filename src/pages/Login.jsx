import { useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useState } from "react";
const StyleLogin = styled.section`
  width: var(--inner);
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .exit-btn {
    font-size: 45px;
    position: absolute;
    right: 10px;
    top: -10px;
    color: var(--primary);
    transition: all.2s;
    &:hover {
      color: var(--positive);
    }
  }
  .form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    height: 500px;
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
`;

const StyleForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  button {
    width: 100%;
    background-color: var(--positive);
    transition: 0.2s;
    font-weight: 600;
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
  .error {
    color: #ff8585;
    font-size: 14px;
    font-weight: 600;
  }
`;
const StyleInput = styled.input`
  width: 320px;
  height: 30px;
  border-bottom: 1px solid var(--primary);
  outline: none;
  transition: 0.2s;
  font-size: 15.5px;
  letter-spacing: 1px;
  padding-left: 2px;
  color: var(--gray-900);
  &:focus {
    border-color: var(--positive);
  }
`;
export default function Login() {
  const [login, setLogin] = useState(true);
  const [id, setId] = useState({ text: "", error: "" });
  const [password, setPassword] = useState({ text: "", error: "" });
  const [passCheck, setPassCheck] = useState({ text: "", error: "" });
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const passCheckInputRef = useRef();
  const inputData = [
    { label: "Email", value: id, type: "id", name: "id", ref: idInputRef },
    { label: "Password", value: password, type: "password", name: "password", ref: passwordInputRef },
  ];

  function loginSignUpHandler() {
    setLogin((pre) => !pre);
    setId(() => ({ text: "", error: "" }));
    setPassword(() => ({ text: "", error: "" }));
    setPassCheck(() => ({ text: "", error: "" }));
  }
  function Validation() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(id.text)) {
      setId((pre) => ({ ...pre, error: "아이디는 이메일 형식이어야 합니다" }));
      setPassword((pre) => ({ ...pre, error: "" }));
      setPassCheck((pre) => ({ ...pre, error: "" }));
      idInputRef.current.focus();
      return false;
    } else if (password.text.length < 8) {
      passwordInputRef.current.focus();
      setId((pre) => ({ ...pre, error: "" }));
      setPassword((pre) => ({ ...pre, error: "비밀번호는 8자 이상이어야 합니다" }));
      setPassCheck((pre) => ({ ...pre, error: "" }));
      return false;
    }

    if (!login && password.text !== passCheck.text) {
      passCheckInputRef.current.focus();
      setId((pre) => ({ ...pre, error: "" }));
      setPassword((pre) => ({ ...pre, error: "" }));
      setPassCheck(() => ({ text: "", error: "비밀번호가 일치하지 않습니다" }));
      return false;
    }
    return true;
  }

  function onSubmit(e) {
    e.preventDefault();
    Validation();
  }

  function onInputChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "id":
        setId((pre) => ({ ...pre, text: value }));
        return;
      case "password":
        setPassword((pre) => ({ ...pre, text: value }));
        return;
      case "passCheck":
        setPassCheck((pre) => ({ ...pre, text: value }));
        return;
    }
  }

  return (
    <StyleLogin>
      <Link onClick={() => window.history.back()} className="exit-btn">
        &#215;
      </Link>
      <div className="form-box">
        <h3>{login ? "Log In" : "Sign Up"}</h3>
        <p>
          {login ? "New to this site?" : "Already a member?"}{" "}
          <span onClick={loginSignUpHandler}>{login ? "Sign Up" : "Log In"}</span>
        </p>
        <StyleForm onSubmit={onSubmit}>
          {inputData.map((el) => (
            <div key={el.name}>
              <label htmlFor={el.label}>{el.label}</label>
              <StyleInput
                ref={el.ref}
                onChange={onInputChange}
                value={el.value.text}
                type={el.type}
                name={el.name}
                id={el.label}
              />
              <span className="error">{el.value.error || ""} </span>
            </div>
          ))}
          {login || (
            <div>
              <label htmlFor={"password-check"}>Password Check</label>
              <StyleInput
                onChange={onInputChange}
                value={passCheck.text}
                type="password"
                name="passCheck"
                id="password-check"
                ref={passCheckInputRef}
              />
              <span className="error">{passCheck.error || ""} </span>
            </div>
          )}
          <button type="submit">{login ? "Log In" : "Sign Up"}</button>
        </StyleForm>
      </div>
    </StyleLogin>
  );
}
