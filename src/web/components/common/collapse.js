import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Collapse = props => {
  const {
    children,
    collapse,
    initialSize = 0,
    isHover = false,
    width = '100%'
  } = props;

  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    collapse ? setSize(width) : setSize(initialSize);
  }, [collapse]);

  const handleOnMouseOver = () => {
    if (isHover && !collapse) setSize(width);
  };

  const handleOnMouseLeave = () => {
    if (isHover && !collapse) setSize(initialSize);
  };

  const wrapper = {
    flexShrink: 0,
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: isHover && collapse ? 'static' : 'absolute',
    top: 0,
    transition: 'width .5s',
    width: size,
    zIndex: 9
  };

  const container = {
    height: '100%',
    width: width
  };

  return (
    <div style={{ ...wrapper }}>
      <div
        style={{ ...container }}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

Collapse.propTypes = {
  children: PropTypes.element,
  collapse: PropTypes.bool,
  initialSize: PropTypes.string,
  isHover: PropTypes.bool,
  width: PropTypes.string
};
