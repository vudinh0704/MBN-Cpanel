import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import { CustomInput, SnackbarWrapper, Title } from 'components/common';
import DataTable, { RenderIsActive } from 'components/common/data-table';
import { memo, useEffect, useMemo, useState } from 'react';
import { parse, stringify } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';

import { MainContent } from 'components/layout/common';
import { functionAction } from 'redux/actions';
import { useRouter } from 'next/router';

export const RenderCommand = ({ cell, dispatch, router }) => {
  const { id, total_roles } = cell.row.values;
  let has_roles = total_roles !== 0;

  const handleDelete = e => {
    e.preventDefault();
    dispatch(functionAction.deleteFunctionById.request({ id: id }));
  };
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
                pathname: '/function/edit',
                hash: stringify({ id })
              },
              null,
              { shallow: true }
            );
          }}
        >
          {'Sửa'}
        </Button>

        <Button
          color="error"
          size="small"
          variant="contained"
          onClick={handleDelete}
          disabled={has_roles}
        >
          {'Xoá'}
        </Button>

        <Button
          color="info"
          size="small"
          variant="contained"
          disabled={!has_roles}
          onClick={e => {
            e.preventDefault();
            router.push(
              {
                pathname: '/function/roles',
                hash: stringify({ function_id: id })
              },
              null,
              { shallow: true }
            );
          }}
        >
          {'Danh sách vai trò'}
        </Button>
      </Stack>
    </>
  );
};

const Function = () => {
  // Init
  const dispatch = useDispatch();

  const router = useRouter();

  const [input, setInput] = useState({
    offset: 0,
    limit: 20,
    keyword: '',
    is_active: ''
  });

  const { message, open, isFirstLoad, loading, functions } = useSelector(
    state => state.func
  );

  //Functions
  const getFunctions = ({ offset, limit, keyword, is_active }) => {
    dispatch(
      functionAction.getFunctions.request({ offset, limit, keyword, is_active })
    );
  };

  const cleanMessage = () => {
    dispatch(functionAction.cleanMessage());
  };

  const handleChange = value => event => {
    setInput({ ...input, [value]: event.target.value });
  };

  const handlePost = e => {
    e.preventDefault();

    router.push(
      {
        pathname: '/function',
        hash: stringify(input)
      },
      undefined,
      { shallow: true }
    );

    cleanMessage();

    getFunctions({ ...input, offset: 0 });
  };

  const handlePageChange = (e, value) => {
    const newInput = { ...input, offset: (value - 1) * input.limit };

    router.push(
      {
        pathname: '/function',
        hash: stringify(newInput)
      },
      undefined,
      { shallow: true }
    );

    setInput(newInput);
    getFunctions(newInput);
  };

  // Effects
  useEffect(() => {
    if (location.hash) {
      const params = parse(location.hash, { parseNumbers: true });
      getFunctions(params);
      setInput(params);
    } else if (!isFirstLoad) {
      getFunctions(input);
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
        width: 170
      },
      {
        Header: 'Tên',
        accessor: 'name',
        width: 170
      },
      {
        Header: 'Diễn giải',
        accessor: 'description',
        width: 200
      },
      {
        Header: 'Trạng thái',
        accessor: 'is_active',
        headerAlign: 'center',
        align: 'center',
        width: 80,
        Cell: RenderIsActive
      },
      {
        Header: 'Số vai trò',
        accessor: 'total_roles'
      },
      {
        id: 'commands',
        Header: '',
        Cell: cell => RenderCommand({ cell, dispatch, router })
      }
    ],
    []
  );

  return (
    <>
      <MainContent>
        <div style={{ paddingTop: 15 }}>
          <Title
            name="Chức năng"
            url={{ pathname: '/function' }}
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

            <FormControl style={{ width: 150 }}>
              <InputLabel id="is-active-label" variant="outlined">
                Active
              </InputLabel>
              <Select
                labelId="is-active-label"
                id="is-active"
                label="Active"
                variant="outlined"
                value={input.is_active}
                onChange={handleChange('is_active')}
              >
                <MenuItem value=""> Không chọn </MenuItem>
                <MenuItem value="true">Đang sử dụng</MenuItem>
                <MenuItem value="false">Không sử dụng</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={e => {
                e.preventDefault();
                router.push(
                  {
                    pathname: '/function/add',
                    hash: ''
                  },
                  null,
                  { shallow: true }
                );
              }}
            >
              Thêm mới
            </Button>
          </Stack>

          <DataTable
            stickyHeader
            {...functions}
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
    </>
  );
};

export default memo(Function);
