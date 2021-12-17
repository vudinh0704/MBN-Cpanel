import { Button, Stack } from '@mui/material';
import { CustomInput, SnackbarWrapper, Title } from 'components/common';
import { parse, stringify } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import DataTable from 'components/common/data-table';
import { MainContent } from 'components/layout/common';
import { functionAction } from 'redux/actions';
import { useRouter } from 'next/router';

const RolesByFunction = () => {
  // Init
  const router = useRouter();
  const dispatch = useDispatch();

  const { message, open, functions, roles, loading } = useSelector(
    state => state.func
  );
  const { offset, limit, keyword, is_active } = functions;

  const [input, setInput] = useState({
    function_id: 0,
    offset: 0,
    limit: 20,
    keyword: ''
  });

  // Functions
  const cleanMessage = () => {
    dispatch(functionAction.cleanMessage());
  };

  const getRoles = ({ function_id, offset, limit, keyword }) => {
    dispatch(
      functionAction.getRolesByFunctionId.request({
        function_id,
        offset,
        limit,
        keyword
      })
    );
  };

  const handleChange = value => event => {
    setInput({ ...input, [value]: event.target.value });
  };

  const handlePageChange = (e, value) => {
    const newInput = { ...input, offset: (value - 1) * input.limit };

    router.push(
      {
        pathname: '/function/roles',
        hash: stringify(newInput)
      },
      undefined,
      { shallow: true }
    );

    setInput(newInput);
    getRoles(newInput);
  };

  const handlePost = e => {
    e.preventDefault();

    router.push(
      {
        pathname: '/function/roles',
        hash: stringify(input)
      },
      undefined,
      { shallow: true }
    );

    cleanMessage();

    getRoles({ ...input, offset: 0 });
  };

  // Effects
  useEffect(() => {
    if (location.hash) {
      const { function_id } = parse(location.hash, { parseNumbers: true });
      setInput({ ...input, function_id });
      getRoles({ ...input, function_id });
    }
  }, []);

  // Render

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
        accessor: 'id',
        Header: 'ID'
      },
      {
        Header: 'Mã',
        accessor: 'code',
        width: 200
      },
      {
        Header: 'Tên',
        accessor: 'name',
        width: 200
      }
    ],
    []
  );

  return (
    <MainContent>
      <div style={{ paddingTop: 15 }}>
        <Title
          name="Chức năng: Danh sách vai trò"
          url={{
            pathname: '/function',
            hash: stringify({ offset, limit, keyword, is_active })
          }}
          onClick={() => {
            cleanMessage();
          }}
        />
        <Stack direction="row" spacing={3}>
          <CustomInput
            id="keyword"
            label="Từ khoá"
            inputType="code"
            value={input.keyword}
            placeholder="Nhập từ khoá để tìm kiếm"
            onChange={handleChange('keyword')}
          />
          <Button variant="contained" onClick={handlePost}>
            Hiển thị
          </Button>
        </Stack>
        <DataTable
          {...roles}
          loading={loading}
          columns={columns}
          onChange={handlePageChange}
          mode="normal"
        />
        {message && (
          <SnackbarWrapper
            key={message.type}
            open={open}
            handleClose={() => cleanMessage}
            color={message.type}
            content={message.content}
          />
        )}
      </div>
    </MainContent>
  );
};

export default RolesByFunction;
