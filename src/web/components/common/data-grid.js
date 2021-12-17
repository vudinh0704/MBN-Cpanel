import { Box, Pagination } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { Loading } from './loading';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './data-grid.module.scss';

export const DataGridWrapper = props => {
  const { columns, items, limit, page, pageCount, onChange, loading } = props;
  const show = items && items.length > 0;

  return (
    <Box className={styles.dataGridWrapper}>
      <Loading loading={loading} />
      {show && (
        <DataGrid
          className={styles.dataGrid}
          pageSize={limit}
          columns={columns}
          rows={items}
          hideFooterPagination
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          hideFooter
          hideFooterSelectedRowCount
        />
      )}
      {show && (
        <Pagination
          className={styles.pagination}
          page={page}
          count={pageCount}
          siblingCount={2}
          boundaryCount={0}
          onChange={onChange}
          color="primary"
          showFirstButton
          showLastButton
          size="medium"
        />
      )}
    </Box>
  );
};

DataGridWrapper.propTypes = {
  loading: PropTypes.bool,
  columns: PropTypes.array,
  items: PropTypes.array,
  limit: PropTypes.number,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

DataGridWrapper.defaultProps = {
  loading: false,
  limit: 20
};
