import { useContext, useState } from 'react';
import { DropDown } from 'components/common';
import { LayoutType } from 'resources';
import { Avatar, Drawer, Tooltip } from '@mui/material';
import { LayoutButtonGroup, LayoutContext, Picker, avatar } from '..';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';

export const ButtonGroup = () => {
  const layoutContext = useContext(LayoutContext);

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <LayoutButtonGroup>
      <div style={{ flexGrow: 1 }}>
        <Badge badgeContent={10} color="primary">
          <NotificationsNoneIcon color="action" />
        </Badge>
      </div>

      <div style={{ flexGrow: 1 }}>
        <Badge badgeContent={5} color="primary">
          <MailOutlineIcon color="action" />
        </Badge>
      </div>

      {layoutContext.browserWidth > 1024 && (
        <div style={{ flexGrow: 1 }}>
          <Tooltip title="Change layout setting">
            <IconButton color="primary" onClick={toggleDrawer}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <Picker onClick={toggleDrawer} />
          </Drawer>
        </div>
      )}

      {layoutContext.theme === LayoutType.horizontal && (
        <div style={{ display: 'flex', flexGrow: 4, height: '100%' }}>
          <DropDown items={avatar}>
            <Avatar
              alt="avatar"
              src=""
              sx={{ height: '30px', width: '30px' }}
            />
          </DropDown>
        </div>
      )}
    </LayoutButtonGroup>
  );
};
