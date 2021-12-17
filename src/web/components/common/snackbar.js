import { Alert, Snackbar } from '@mui/material';

import PropTypes from 'prop-types';

export const SnackbarWrapper = props => {
  return (
    <Snackbar
      key={props.id}
      open={props.open}
      autoHideDuration={props.duration}
      onClose={props.handleClose()}
      anchorOrigin={{ ...props.align }}
    >
      <Alert
        open={props.open}
        onClose={props.handleClose()}
        color={props.color}
      >
        {props.content}
      </Alert>
    </Snackbar>
  );
};

SnackbarWrapper.propTypes = {
  align: PropTypes.object,
  content: PropTypes.string,
  duration: PropTypes.number,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

SnackbarWrapper.defaultProps = {
  align: { vertical: 'top', horizontal: 'right' },
  color: 'error',
  content: '',
  duration: 3000
};
