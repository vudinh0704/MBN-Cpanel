import { useContext } from 'react';
import { LayoutType } from 'resources';
import { IconButton, Typography } from '@mui/material';
import {
  LayoutContext,
  LayoutPicker,
  LayoutPickerContent,
  LayoutPickerHeader,
  LayoutThumbnail
} from '..';
import CloseIcon from '@mui/icons-material/Close';

export const Picker = ({ onClick }) => {
  const layoutContext = useContext(LayoutContext);

  return (
    <LayoutPicker>
      <LayoutPickerHeader>
        <Typography variant="h6">Theme Settings</Typography>
        <IconButton size="small" onClick={onClick}>
          <CloseIcon />
        </IconButton>
      </LayoutPickerHeader>

      <LayoutPickerContent>
        <LayoutThumbnail
          src="/images/horizontal.png"
          alt="Horizontal Layout"
          name="Horizontal"
          onClick={() => layoutContext.changeTheme(LayoutType.horizontal)}
        />

        <LayoutThumbnail
          src="/images/vertical.png"
          alt="Vertical Layout"
          name="Vertical"
          onClick={() => layoutContext.changeTheme(LayoutType.vertical)}
        />

        <LayoutThumbnail
          src="/images/minimal.png"
          alt="Minimal Layout"
          name="Minimal"
          onClick={() => layoutContext.changeTheme(LayoutType.minimal)}
        />
      </LayoutPickerContent>
    </LayoutPicker>
  );
};
