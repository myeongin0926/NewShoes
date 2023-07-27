import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { uploadImage } from "../api/uploader";

const StyleAdmin = styled.section`
  height: calc(100vh - 150px);
  display: flex;
  width: 100%;
  flex-direction: column;
  .image-box {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    img {
      width: 50%;
    }
  }
  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 10px;
    align-items: center;
  }
  input {
    min-width: 250px;
    background-color: var(--gray-300);
    padding: 20px 10px;
    font-size: 16px;
    width: 50%;
    margin-bottom: 5px;
    border-radius: 5px;
    outline: none;
    &:focus {
      background-color: var(--gray-500);
    }
  }
  button {
    min-width: 250px;
    font-size: 16px;
    bottom: 0;
    width: 50%;
    border: 2px solid var(--primary);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: var(--primary);
      color: white;
    }
    margin-bottom: 20px;
  }
`;

export default function NewProducts() {
  const { user } = useAuthContext();
  const [product, setProduct] = useState({});
  const[file,setFile] = useState()
  const navigation = useNavigate();
  useEffect(() => {
    if (user?.isAdmin === false || user === null) {
      navigation("/");
    }
  }, [user , navigation]);

  const productSubmitHandler = (e) => {
    e.preventDefault();
    uploadImage(file).then(url => {
      console.log(url)
    })
  }
  console.log(product)
  const onInputChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') setFile(files && files[0])
    else setProduct(product => ({ ...product, [name]: value }))
 }

  return (
    <StyleAdmin>
      {file && (
        <div className='image-box'>
          <img src={URL.createObjectURL(file)} alt="prodct img" />
        </div>
      )}
      <form onSubmit={productSubmitHandler}>
        <input type="file" accept="image/*" name="file" required onChange={onInputChangeHandler} />
        <input
          type="text"
          name="title"
          value={product.title || ""}
          placeholder="제품명"
          required
          onChange={onInputChangeHandler}
        />
        <input
          type="number"
          name="price"
          value={product.price || ""}
          placeholder="가격"
          required
          onChange={onInputChangeHandler}
        />
        <input
          type="text"
          name="category"
          value={product.category || ""}
          placeholder="카테고리"
          required
          onChange={onInputChangeHandler}
        />
        <input
          type="text"
          name="description"
          value={product.description || ""}
          placeholder="상세정보"
          required
          onChange={onInputChangeHandler}
        />
        <input
          type="text"
          name="options"
          value={product.options || ""}
          placeholder="옵션 - 콤마(,)로 구분"
          required
          onChange={onInputChangeHandler}
        />
        <button type="submit">제품 등록하기</button>
      </form>
    </StyleAdmin>
  );
}
