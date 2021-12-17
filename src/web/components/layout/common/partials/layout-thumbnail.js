import { useContext } from 'react';
import {
  LayoutContext,
  LayoutIcon,
  LayoutImage,
  LayoutName,
  LayoutTypeFrame
} from '..';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const LayoutThumbnail = ({ src, alt, name, onClick }) => {
  const layoutContext = useContext(LayoutContext);

  return (
    <LayoutTypeFrame onClick={onClick}>
      <LayoutImage src={src} alt={alt} />
      {name === layoutContext.theme && (
        <LayoutIcon as={CheckCircleIcon} color="success" />
      )}
      <LayoutName>{name}</LayoutName>
    </LayoutTypeFrame>
  );
};
