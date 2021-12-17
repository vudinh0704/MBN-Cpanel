import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Loading } from './loading';
import PropTypes from 'prop-types';
import styles from './data-grid.module.scss';
import { useMemo } from 'react';
import { useTable } from 'react-table';

export const RenderIsActive = ({ cell }) => {
  const isActive = cell.value;
  return isActive ? (
    <CheckIcon fontSize="large" color="success" />
  ) : (
    <CloseIcon fontSize="large" color="error" />
  );
};

const Paginator = props => {
  const { page, pageCount, limit, onChange, hasNext } = props;
  switch (props.mode) {
    case 'normal':
      return (
        <Pagination
          boundaryCount={0}
          className={styles.pagination}
          color="primary"
          count={pageCount}
          onChange={onChange}
          page={page}
          showFirstButton
          showLastButton
          siblingCount={2}
          size="medium"
        />
      );

    case 'unlimited':
      return (
        <TablePagination
          component="div" // div vì nằm ngoài table.
          labelRowsPerPage="" // Chưa chọn limit.
          labelDisplayedRows={({ from, to }) => `Hiển thị ${from} - ${to}`}
          rowsPerPageOptions={[-1]} // Hiện tại chưa cho chọn limit.
          rowsPerPage={limit}
          page={page} // zero-based index (Bắt đầu từ 0).
          count={-1}
          backIconButtonProps={{
            title: 'Trang trước'
          }}
          nextIconButtonProps={{
            disabled: !hasNext,
            title: 'Trang sau'
          }}
          onPageChange={onChange}
        />
      );

    default:
      return <></>;
  }
};

const DataTable = props => {
  const { columns, items, loading, hiddenColumns, stickyHeader } = props;

  //TODO: Resizable columns
  const defaultColumn = useMemo(
    () => ({
      minWidth: 50, // minWidth is only used as a limit for resizing
      width: 100, // width is used for both the flex-basis and flex-grow
      maxWidth: 400 // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: items,
      defaultColumn,
      initialState: {
        hiddenColumns: [...(hiddenColumns || []), 'id']
      }
    });
  const show = items && items.length > 0;

  return (
    <>
      <Loading loading={loading} />
      <Box className={styles.dataGridWrapper}>
        {show && (
          <Table
            padding="none"
            {...getTableProps()}
            className={styles.dataGrid}
            stickyHeader={stickyHeader}
          >
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell
                      sx={{ padding: '5px' }}
                      className={styles.header}
                      {...column.getHeaderProps({
                        align: column.headerAlign,
                        width: column.width || 100
                      })}
                    >
                      {column.render('Header')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <TableCell
                          sx={{ padding: '5px' }}
                          className={
                            row.values.index % 2
                              ? styles.evenRow
                              : styles.oddRow
                          }
                          {...cell.getCellProps({
                            align: cell.column.align,
                            width: cell.column.width || 100
                          })}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>
      {show && <Paginator {...props} />}
    </>
  );
};

export default DataTable;

DataTable.propTypes = {
  loading: PropTypes.bool,
  stickyHeader: PropTypes.bool,
  /**
   * Mode của Pagination, nhận 1 trong 2 giá trị 'normal' hoặc 'unlimited'.
   */
  mode: PropTypes.oneOf(['normal', 'unlimited']),
  columns: PropTypes.array.isRequired,
  items: PropTypes.array,
  limit: PropTypes.number,
  /**
   * Trang hiện tại.
   * Mode 'normal': trang bắt đầu từ 1. Mode 'unlimited': trang bắt đầu từ 0.
   */
  page: PropTypes.number,
  /**
   * Tổng số trang (mode 'normal').
   */
  pageCount: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

DataTable.defaultProps = {
  loading: false,
  limit: 20,
  mode: 'normal'
};
