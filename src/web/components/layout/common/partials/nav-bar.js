import { DropDown } from 'components/common';
import { LayoutNavBar, data } from '..';

export const NavBar = () => {
  return (
    <LayoutNavBar>
      {data.map((x, index) => (
        <DropDown key={'navbar-' + index} items={x.subMenu}>
          <>{x.menu}</>
        </DropDown>
      ))}
    </LayoutNavBar>
  );
};
