import { useContext } from 'react';
import { LayoutContext } from './common';
import { LayoutType } from 'resources';
import { HorizontalLayout, MinimalLayout, VerticalLayout } from './types';

export const Layout = ({ children }) => {
  const layoutContext = useContext(LayoutContext);

  switch (layoutContext.theme) {
    case LayoutType.horizontal: {
      return <HorizontalLayout>{children}</HorizontalLayout>;
    }
    case LayoutType.vertical: {
      return <VerticalLayout>{children}</VerticalLayout>;
    }
    case LayoutType.minimal: {
      return <MinimalLayout>{children}</MinimalLayout>;
    }
    default: {
      return <MinimalLayout>{children}</MinimalLayout>;
    }
  }
};
