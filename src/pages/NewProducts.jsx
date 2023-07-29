import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { uploadImage } from "../api/uploader";
import LoadingModal from "../Components/LoadingModal";
import { addNewProduct } from "../api/firebase";
const StyleAdmin = styled.section`
  height: calc(100vh - 150px);
  display: flex;
  width: 100%;
  flex-direction: column;
  .upload-message{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: var(--gray-700);
  }
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
  const [ product, setProduct ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false)
  const [ sucess , setSucess] = useState(false)
  const[ file,setFile ] = useState()
  const[ subFile,setSubFile ] = useState()



const productSubmitHandler = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const files = [];
  try {
     files.push(await uploadImage(file));
     files.push(await uploadImage(subFile));
    console.log(files)
    await addNewProduct(product, files)
    setIsLoading(false);
    setSucess(true);
    setTimeout(() => setSucess(false), 3000);
    setProduct({});
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
};


const onInputChangeHandler = (e) => {
  const { name, value, files } = e.target;
  if (name === "file") setFile(files && files[files.length - 1]);
  else if (name === "sub file") setSubFile(files && files[files.length - 1]);
  else setProduct((product) => ({ ...product, [name]: value }));
};

  return (
    <>
      {isLoading && <LoadingModal />}
      <StyleAdmin>
  
          <div className="image-box">
          {file && <img src={URL.createObjectURL(file)} alt="prodct img" />}
          { subFile && <img src={URL.createObjectURL(subFile)} alt="prodct sub img" />}
          </div>
  
        <form onSubmit={productSubmitHandler}>
          {sucess && <div className="sucess-message">업로드가 성공적으로 이루어졌습니다</div>}
          <input type="file" accept="image/*" name="file" required onChange={onInputChangeHandler} />
          <input type="file" accept="image/*" name="sub file" required onChange={onInputChangeHandler} />
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
    </>
  );
}
