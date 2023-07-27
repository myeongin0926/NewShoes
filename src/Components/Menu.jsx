import { styled } from "styled-components";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
const StyleSideMenu = styled.section`
  padding-top: 13px;
  width: 450px;
  height: 95vh;
  border-radius: 40px 0 0 40px;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 11;
  transition: 0.5s;
  right: -460px;
  position: fixed;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  box-shadow: 0 0 3px 4px var(--gray-300);
  .exit-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 50px;
    width: 50px;
    cursor: pointer;
    margin: auto;
    left: -70px;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    border-radius: 30px;
    background-color: var(--primary);
    transition: 0.3s;
    &:hover {
      border-radius: 10px;
    }
  }
  &.open {
    right: 0;
  }
  .user-description {
    width: 100%;
    height: 100px;
    display: flex;
    letter-spacing: 1px;
    .user-card {
      margin-left: 30px;
      display: flex;
      align-items: center;
      gap: 20px;
      img {
        width: 60px;
        border-radius: 50%;
      }
      span:first-child {
        font-size: 20px;
        font-weight: bold;
        display: block;
      }
      a {
        position: absolute;
        top: 30px;
        right: 30px;
        background-color: var(--gray-700);
        border-radius: 30px;
        color: var(--white);
        padding: 3px 7px;
        font-weight: bold;
      }
    }
    .login-card {
      font-size: 20px;
      font-weight: bold;
      color: var(--gray-700);
      flex: 1;
      text-align: center;
    }
  }
`;

export default function SideMenu({ sideBar, sideBarHandler, user }) {
  const params = useParams()
  useEffect(() => {
    sideBarHandler(false)
  } , [params])
  return (
    <StyleSideMenu onClick={(e) => e.stopPropagation()} className={sideBar ? "open" : ""}>
      <div className="exit-btn" onClick={() => sideBarHandler(!sideBar)}>
        {sideBar ? <HiOutlineChevronDoubleRight size={30} /> : <FiShoppingBag size={30} />}
      </div>
      <div className="user-description">
        {user ? (
          <div className="user-card">
            {user.isAdmin && <Link to="/products/new">Admin</Link>}
            <img src={user.photoURL || "/images/userProfile.png"} alt="userProfile" />
            <p>
              <span>{user.displayName}</span>
              <span>{user.email}</span>
            </p>
          </div>
        ) : (
          <div className="login-card">로그인 정보가 없습니다</div>
        )}
      </div>
    </StyleSideMenu>
  );
}
