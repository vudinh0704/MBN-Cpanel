import styled from 'styled-components';

const LayoutButtonGroup = styled.div`
  align-items: center;
  background-color: inherit;
  display: flex;
  flex-shrink: 0;
  height: 100%;
  justify-content: space-between;
  min-width: 15%;
`;

const LayoutHeader = styled.div`
  align-items: center;
  background-color: rgb(230, 250, 255);
  display: flex;
  flex-shrink: 0;
  height: 50px;
  justify-content: space-between;
  padding: 0 5%;
  width: 100%;
`;

const LayoutHeaderContent = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;

const LayoutHorizontal = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LayoutIcon = styled.div`
  left: 50%;
  position: absolute;
  top: 55%;
  transform: translate(-50%, -50%);
`;

const LayoutImage = styled.img`
  height: 100%;
  width: 100%;
`;

const LayoutMinimal = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const LayoutName = styled.div`
  text-align: center;
`;

const LayoutNavBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const LayoutPicker = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 300px;
`;

const LayoutPickerContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
`;

const LayoutPickerHeader = styled.div`
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 15px 10px 15px 15px;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const LayoutSideBar = styled.div`
  background-color: #fff;
  border-right: 1px solid rgb(200, 200, 200);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: inherit;
  width: 100%;
`;

const LayoutSideBarContent = styled.div`
  flex-grow: 1;
  overflow: overlay;
`;

const LayoutSideBarHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-around;
  align-items: center;
  min-height: 15%;
  padding: 5px;
  width: 100%;
`;

const LayoutTextEllipsis = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LayoutTypeFrame = styled.div`
  height: 65px;
  position: relative;
  width: 100px;
`;

const LayoutVertical = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  max-height: calc(100% - 50px);
  max-width: 100%;
  position: relative;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  overflow: auto;
  padding: 0 1% 0 2.5%;
`;

export {
  LayoutButtonGroup,
  LayoutHorizontal,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutIcon,
  LayoutImage,
  LayoutMinimal,
  LayoutName,
  LayoutNavBar,
  LayoutPicker,
  LayoutPickerContent,
  LayoutPickerHeader,
  LayoutSideBar,
  LayoutSideBarContent,
  LayoutSideBarHeader,
  LayoutTextEllipsis,
  LayoutTypeFrame,
  LayoutVertical,
  Main,
  MainContent
};
