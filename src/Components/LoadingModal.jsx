import { Oval } from "react-loader-spinner";
import { styled } from "styled-components";
const StyleLoading = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default function LoadingModal() {
    return (
      <StyleLoading onClick={e => e.stopPropagation()}>
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
      </StyleLoading>
    );
}

