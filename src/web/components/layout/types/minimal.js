import { useState } from 'react';
import { Collapse } from 'components/common';
import { Header, LayoutMinimal, Main, MainContent, SideBar } from '../common';
import GlobalStyle from 'styles/global-style';

export const MinimalLayout = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <GlobalStyle />
      <LayoutMinimal>
        <Header onClick={toggleCollapse} />
        <Main>
          <Collapse collapse={collapse} width="250px">
            <SideBar />
          </Collapse>
          <MainContent>{children}</MainContent>
        </Main>
      </LayoutMinimal>
    </>
  );
};
