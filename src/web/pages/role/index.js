import { memo, useEffect, useMemo, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { parse, stringify } from 'query-string';
import { SnackbarWrapper } from 'components/common';
import { MainContent } from 'components/layout/common';
import { roleAction } from 'redux/actions';
import { useRouter } from 'next/router';
import DataTable from 'components/common/data-table';

const GetRoles = () => {
  // Init.
  const router = useRouter();

  const dispatch = useDispatch();

  const state = useSelector(state => state.role);

  const { results, keyword, offset, limit, loading, open, message, onDelete } =
    state;

  const [input, setInput] = useState({
    keyword: keyword,
    offset: offset,
    limit: limit
  });

  // Effects.
  useEffect(() => {
    if (location.hash) {
      const params = parse(location.hash, { parseNumbers: true });

      getRoles(params);
      setInput(params);
    } else {
      handleGet();
    }
  }, []);

  useEffect(() => {
    if (onDelete) getRoles({ keyword, offset, limit });
  }, [onDelete]);

  // Functions.
  const getRoles = ({ keyword, offset, limit }) => {
    dispatch(roleAction.getRoles.request({ keyword, offset, limit }));
  };

  const handleBlur = value => e => {
    setInput({ ...input, [value]: e.target.value });
  };

  const handleClean = () => {
    dispatch(roleAction.cleanMessage());
  };

  const handleDelete = e => {
    e.preventDefault();
    dispatch(roleAction.deleteRole.request({ id: e.target.id }));
  };

  const handleGet = (e, value = 1) => {
    let offset = value === 1 ? 0 : (value - 1) * input.limit;
    let params = { ...input, offset: offset };

    router.push(
      {
        pathname: '/role',
        hash: stringify(params)
      },
      undefined,
      { shallow: true }
    );

    getRoles(params);
  };

  // Render.
  const renderActions = cell => {
    const { id } = cell.row.original;

    return (
      <>
        <Stack direction="row" spacing={2}>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={e => {
              e.preventDefault();
              router.push(
                {
                  pathname: '/role/edit',
                  hash: stringify({ id })
                },
                null,
                { shallow: true }
              );
            }}
          >
            Sửa
          </Button>

          <Button
            color="error"
            id={id}
            size="small"
            variant="contained"
            onClick={handleDelete}
          >
            Xoá
          </Button>

          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={e => {
              e.preventDefault();
              router.push(
                {
                  pathname: '/role/user',
                  hash: stringify({ id: id })
                },
                null,
                { shallow: true }
              );
            }}
          >
            Danh sách tài khoản
          </Button>
        </Stack>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        headerAlign: 'center',
        align: 'center',
        accessor: 'index',
        width: 70
      },
      {
        Header: 'Mã',
        accessor: 'code',
        width: 170
      },
      {
        Header: 'Tên',
        accessor: 'name',
        width: 170
      },
      {
        id: 'actions',
        Header: 'Thao tác',
        headerAlign: 'center',
        align: 'center',
        Cell: cell => renderActions(cell)
      }
    ],
    []
  );

  return (
    <MainContent>
      <h1>Danh sách vai trò</h1>

      <br />

      <Stack direction="row" spacing={2} style={{ paddingTop: '10px' }}>
        <TextField
          variant="outlined"
          label="Từ khoá"
          color="primary"
          type="search"
          placeholder="Nhập từ khoá để tìm kiếm"
          onBlur={handleBlur('keyword')}
        />

        <Button
          style={{ height: '3.5rem' }}
          variant="contained"
          onClick={handleGet}
        >
          Hiển thị
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={e => {
            e.preventDefault();
            router.push(
              {
                pathname: '/role/add',
                hash: ''
              },
              null,
              { shallow: true }
            );
          }}
        >
          Tạo mới vai trò
        </Button>
      </Stack>

      <br />

      <DataTable
        stickyHeader
        mode="normal"
        loading={loading}
        columns={columns}
        onChange={handleGet}
        {...results}
      />

      {state && state.message && (
        <SnackbarWrapper
          id={message.type}
          open={open}
          handleClose={() => handleClean}
          color={message.type}
          content={message.content}
        />
      )}
    </MainContent>
  );
};

export default memo(GetRoles);
