import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { specialCharacter } from 'utils';

export const CustomInput = props => {
  const onKeyPress = e => {
    switch (props.inputType) {
      case 'code': {
        const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (specialCharacter.test(key)) {
          e.preventDefault();
        }
        return;
      }

      default:
        return;
    }
  };

  return (
    <TextField
      id={props.id}
      variant={props.variant}
      label={props.label}
      color={props.color}
      type={props.type}
      value={props.value}
      placeholder={props.placeHolder}
      onChange={props.onChange}
      onKeyPress={onKeyPress}
    ></TextField>
  );
};

CustomInput.propTypes = {
  color: PropTypes.string,
  id: PropTypes.string,
  inputType: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  variant: PropTypes.string
};

CustomInput.defaultProps = {
  color: 'primary',
  inputType: '',
  label: '',
  placeHolder: 'Nhập...',
  type: 'search',
  variant: 'outlined'
};
