import { useState } from "react";
import { styled } from "styled-components";
import { uploadImage } from "../api/uploader";
import LoadingModal from "../Components/loading/LoadingModal";
import useProducts from "../hooks/useProducts";
import { notifySuccess } from "../Components/toast/Notify";
const StyleAdmin = styled.section`
  height: calc(100vh - 150px);
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  .image-box {
    border: 1px inset var(--gray-500);
    border-radius: 5px;
    height: 200%;
    display: flex;
    justify-content: center;
    img {
      width: 50%;
    }
  }
  form {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }
  input {
    width: 49%;
    background-color: transparent;
    border: 1px inset var(--positive);
    padding: 20px 10px;
    font-size: 16px;
    border-radius: 5px;
    outline: none;
  }
  button {
    min-width: 250px;
    font-size: 16px;
    width: 49%;
    padding: 20px 10px;
    border: 1px solid var(--positive);
    color: white;
    background-color: var(--positive);
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border-color: var(--primary);
      background-color: var(--primary);
    }
  }
`;

export default function NewProducts() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [subFile, setSubFile] = useState();
  const { addProduct } = useProducts();

  const productSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const files = [];
    try {
      files.push(await uploadImage(file));
      files.push(await uploadImage(subFile));
      addProduct.mutate(
        { product, files },
        {
          onSuccess: () => {
            setIsLoading(false);
            setProduct({});
            notifySuccess("제품 등록이 완료되었습니다.");
          },
        }
      );
    } catch (error) {
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
          {subFile && <img src={URL.createObjectURL(subFile)} alt="prodct sub img" />}
        </div>

        <form onSubmit={productSubmitHandler}>
          <input
            type="file"
            accept="image/*"
            name="file"
            required
            onChange={onInputChangeHandler}
          />
          <input
            type="file"
            accept="image/*"
            name="sub file"
            required
            onChange={onInputChangeHandler}
          />
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
