import { styled } from "styled-components";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
const StyleSideMenu = styled.aside`
  width: 450px;
  height: 95vh;
  padding: 20px 20px;
  border-radius: 10px 0 0 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 11;
  transition: 0.5s;
  right: -460px;
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
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

  .user-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    img {
      width: 50px;
      border-radius: 50%;
    }
    .user-description {
      div:first-child {
        font-weight: bold;
      }
      div {
        display: flex;
        justify-content: space-between;
        a {
          color: var(--primary);
          padding: 0 5px;
          border-radius: 3px;
          transition: all.2s;
          &:hover {
            background-color: var(--primary);
            color: var(--white);
          }
        }
      }
    }
  }
  .cart {
    flex: 1;
    margin: 20px 0;
    overflow: auto;
    div{
      height: 100px;
    }
  }
  .total{
    height: 80px;
    background-color: black;
  }
  .payment {
    height: 50px;
    border-radius: 5px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    color: white;
    background-color: var(--primary);
    transition: all.2s;
    opacity: 0.5;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      opacity: 1;
    }
  }
`;

export default function SideMenu({ sideBar, sideBarHandler, user }) {
  const params = useParams()
  useEffect(() => {
    sideBarHandler(false)
  } , [params ])
  return (
    <StyleSideMenu onClick={(e) => e.stopPropagation()} className={sideBar ? "open" : ""}>
      <div className="exit-btn" onClick={() => sideBarHandler(!sideBar)}>
        {sideBar ? <HiOutlineChevronDoubleRight size={30} /> : <FiShoppingBag size={30} />}
      </div>
      {user ? (
        <>
          <div className="user-card">
            <img src={user.photoURL || "/images/userProfile.png"} alt="userProfile" />
            <div className="user-description">
              <div>
                {user.displayName} {user.isAdmin && <Link to="/products/new">Admin</Link>}
              </div>
              <div>{user.email}</div>
            </div>
          </div>
          <div className="cart">
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
          </div>
          <div className='total'>총합</div>
          <button className="payment">결제하기</button>
        </>
      ) : (
        <div className="login-card">로그인 정보가 없습니다</div>
      )}
    </StyleSideMenu>
  );
}
