import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  grid-template-rows: auto 1fr;
`;
function AppLayout() {
  return (
    <StyledDiv>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledDiv>
  );
}

export default AppLayout;
