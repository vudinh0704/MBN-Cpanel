import { useState } from 'react';
import { Avatar, Divider } from '@mui/material';
import { CustomAccordion, DropDown } from 'components/common';
import {
  LayoutSideBar,
  LayoutSideBarHeader,
  LayoutSideBarContent,
  LayoutTextEllipsis,
  avatar,
  data
} from '..';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const SideBar = () => {
  const [expanded, setExpanded] = useState('');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <LayoutSideBar>
      <LayoutSideBarHeader>
        <div style={{ padding: '15px 0' }}>
          <Avatar alt="avatar" src="" />
        </div>
        <DropDown items={avatar}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: '32.5px',
              width: '100%'
            }}
          >
            <LayoutTextEllipsis>admin@muaban.net</LayoutTextEllipsis>
            <ArrowDropDownIcon />
          </div>
        </DropDown>
      </LayoutSideBarHeader>

      <Divider />

      <LayoutSideBarContent>
        {data.map((x, index) => (
          <CustomAccordion
            expanded={expanded === x.menu}
            group={x.menu}
            icon={x.icon}
            items={x.subMenu}
            key={'sidebar-' + index}
            onChange={handleChange(x.menu)}
          />
        ))}
      </LayoutSideBarContent>
    </LayoutSideBar>
  );
};
