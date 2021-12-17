import { useState } from 'react';
import { Collapse } from 'components/common';
import { Header, LayoutVertical, Main, MainContent, SideBar } from '../common';
import GlobalStyle from 'styles/global-style';

export const VerticalLayout = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <GlobalStyle />
      <LayoutVertical>
        <Header onClick={toggleCollapse} />
        <Main>
          <Collapse
            collapse={collapse}
            initialSize="57px"
            isHover
            width="250px"
          >
            <SideBar />
          </Collapse>
          <MainContent>{children}</MainContent>
        </Main>
      </LayoutVertical>
    </>
  );
};
