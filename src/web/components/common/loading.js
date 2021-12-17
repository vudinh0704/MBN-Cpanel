import { Box, LinearProgress } from '@mui/material';

import PropTypes from 'prop-types';
import styles from './data-grid.module.scss';

export const Loading = props => {
  return (
    <Box className={styles.loading}>{props.loading && <LinearProgress />}</Box>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool
};
