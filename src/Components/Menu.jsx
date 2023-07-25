import { styled } from "styled-components";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { FiShoppingBag } from "react-icons/fi";
const StyleSideMenu = styled.section`
  padding-top: 13px;
  width: 450px;
  height: 95vh;
  border-radius: 40px;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 11;
  transition: 0.5s;
  right: -450px;
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: var(--positive);
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
    background-color: var(--positive);
    transition: 0.3s;
    &:hover {
      border-radius: 10px;
    }
  }
  &.open {
    right: 0;
  }
  .user-description {
    border-radius: 33px 33px 5px 5px;
    width: 95%;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    letter-spacing: 1px;
    background-color: #ffffff;
    .user-card {
      padding-left: 22px;
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

export default function SideMenu({ sideBar, sideBarHandler, user, loginModalHandler }) {
  console.log(user);
  return (
    <StyleSideMenu onClick={(e) => e.stopPropagation()} className={sideBar ? "open" : ""}>
      <div className="exit-btn" onClick={() => sideBarHandler(!sideBar)}>
        {sideBar ? <HiOutlineChevronDoubleRight size={30} /> : <FiShoppingBag size={30} />}
      </div>
      <div className="user-description">
        {user ? (
          <div className="user-card">
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
