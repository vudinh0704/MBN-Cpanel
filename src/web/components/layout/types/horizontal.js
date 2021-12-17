import { Header, LayoutHorizontal, Main, MainContent, NavBar } from '../common';
import GlobalStyle from 'styles/global-style';

export const HorizontalLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <LayoutHorizontal>
        <Header>
          <NavBar />
        </Header>
        <Main>
          <MainContent>{children}</MainContent>
        </Main>
      </LayoutHorizontal>
    </>
  );
};
