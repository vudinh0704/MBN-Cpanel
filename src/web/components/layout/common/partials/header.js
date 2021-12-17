import { useContext } from 'react';
import { LayoutType } from 'resources';
import { IconButton, Toolbar, Typography } from '@mui/material';
import {
  ButtonGroup,
  LayoutContext,
  LayoutHeader,
  LayoutHeaderContent,
  Logo
} from '..';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = ({ children, onClick }) => {
  const layoutContext = useContext(LayoutContext);

  return (
    <LayoutHeader>
      {layoutContext.theme !== LayoutType.horizontal && (
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 0.5, mb: 0.1 }}
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>

          <Typography>MENU</Typography>
        </Toolbar>
      )}

      <Logo />

      {layoutContext.theme !== LayoutType.minimal && (
        <LayoutHeaderContent>{children}</LayoutHeaderContent>
      )}

      <ButtonGroup />
    </LayoutHeader>
  );
};
