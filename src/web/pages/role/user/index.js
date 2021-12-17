import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { parse, stringify } from 'query-string';
import { SnackbarWrapper } from 'components/common';
import { MainContent } from 'components/layout/common';
import { roleAction } from 'redux/actions';
import { useRouter } from 'next/router';
import DataTable from 'components/common/data-table';
import Link from 'next/link';

const GetUsers = () => {
  // Init.
  const router = useRouter();

  const dispatch = useDispatch();

  const state = useSelector(state => state.role);

  const { results, keyword, offset, limit, loading, open, message } = state;

  const [input, setInput] = useState({
    id: 0,
    keyword: keyword,
    offset: offset,
    limit: limit
  });

  const ref = useRef({ keyword, offset, limit });

  // Effects.
  useEffect(() => {
    if (location.hash) {
      const { id } = parse(location.hash, { parseNumbers: true });

      setInput({ ...input, id: id });
      getUsersByRoleId({ ...input, id: id });
    }
  }, []);

  // Functions.
  const getUsersByRoleId = ({ id, keyword, offset, limit }) => {
    dispatch(
      roleAction.getUsersByRoleId.request({ id, keyword, offset, limit })
    );
  };

  const handleBlur = value => e => {
    setInput({ ...input, [value]: e.target.value });
  };

  const handleClean = () => {
    dispatch(roleAction.cleanMessage());
  };

  const handleGet = (e, value = 1) => {
    let offset = value === 1 ? 0 : (value - 1) * input.limit;
    let params = { ...input, offset: offset };

    router.push(
      {
        pathname: '/role/user',
        hash: stringify(params)
      },
      undefined,
      { shallow: true }
    );

    getUsersByRoleId(params);
  };

  // Render.
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
        Header: 'Tên tài khoản',
        accessor: 'user_name',
        width: 170
      },
      {
        Header: 'Điện thoại',
        accessor: 'phone',
        width: 170
      },
      {
        Header: 'Mã',
        accessor: 'code',
        width: 170
      },
      {
        Header: 'Tên',
        accessor: 'full_name',
        width: 170
      }
    ],
    []
  );

  return (
    <MainContent>
      <h1>Danh sách tài khoản thuộc vai trò</h1>

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

        <Link
          href={{ pathname: '/role', hash: stringify(ref.current) }}
          passHref
        >
          <Button style={{ height: '3.5rem' }} variant="contained">
            Back
          </Button>
        </Link>
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

export default GetUsers;
