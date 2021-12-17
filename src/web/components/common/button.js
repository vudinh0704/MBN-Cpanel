import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Button = styled.button`
  font-size: ${props => props.fontSize || '15px'};
  padding: 8px 24px;
  border-radius: 8px;
  border: 0;
  transition: background 0.3s ease;
  cursor: pointer;
  &:hover {
    filter: brightness(0.85);
    box-shadow: 5px 5px 20px rgb(0 0 0 / 10%);
  }
  :disabled {
    pointer-events: none;
    opacity: 0.65;
  }
`;

export const PrimaryButton = styled(Button)`
  color: #fff;
  background: #0671ca;
  border-radius: 24px;
`;

export const LightButton = styled(Button)`
  color: #000;
  background-color: #f8f9fa;
`;

Button.propTypes = {
  onClick: PropTypes.func
};

Button.defaultProps = {
  fontSize: '15px',
  onClick: null
};
