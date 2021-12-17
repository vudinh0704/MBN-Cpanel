import { DatePicker } from '@mui/lab';
import {
  Stack,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  CircularProgress,
  Backdrop,
  Alert
} from '@mui/material';
import DataTable, { RenderIsActive } from 'components/common/data-table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from 'redux/actions';
import {
  isDateValid,
  formatDateTime,
  defaultDateMask,
  defaultDateFormat,
  resetTime
} from 'utils/datetimeHelper';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { parse, stringify } from 'query-string';

const defaultSize = 'small';
const defaultSpacing = 3;
const defaultSx = { width: 300 };

const keywordTypes = [
  { label: 'Số điện thoại', value: 'phone' },
  { label: 'Email', value: 'email' },
  { label: 'CMND', value: 'identity_card' }
];

const agentTypes = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đại lý', value: 'is_agent' },
  { label: 'Không phải đại lý', value: 'is_not_agent' }
];

const cpanelTypes = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Nhân viên', value: 'is_cpanel' },
  { label: 'Không phải nhân viên', value: 'is_not_cpanel' }
];

const dateTypes = [
  { label: 'Ngày tạo', value: 'created' },
  { label: 'Ngày cập nhật', value: 'updated' }
];

const manageTypes = [
  { label: 'Tôi chăm sóc, Chưa chăm sóc, Khác', value: 'manage_by_my_self' },
  { label: 'Chưa chăm sóc', value: 'not_manage' },
  { label: 'Khác', value: 'others' }
];

const defaultLimit = 20;
const defaultPage = 0;
const defaultUserType = '';

const schema = yup
  .object({
    keyword_type: yup.string(),
    keyword: yup.string(),
    is_agent: yup.string(),
    is_cpanel: yup.string(),
    manage_by: yup.string(),
    date_type: yup.string(),
    start_date: yup
      .date()
      .nullable()
      .typeError('Ngày bắt đầu không hợp lệ')
      .max(
        yup.ref('end_date'),
        'Ngày bắt đầu không được lớn hơn Ngày kết thúc'
      ),
    end_date: yup
      .date()
      .nullable()
      .typeError('Ngày kết thúc không hợp lệ')
      .min(
        yup.ref('start_date'),
        'Ngày kết thúc không được nhỏ hơn Ngày bắt đầu'
      ),
    user_type: yup.number(),
    manage_type: yup.string()
  })
  .required();

const columns = [
  { Header: '#', accessor: 'index', width: 70 },
  { accessor: 'id', Header: 'ID' },
  { Header: 'Điện thoại', accessor: 'phone', width: 170 },
  { Header: 'Tên đăng nhập', accessor: 'username', width: 170 },
  { Header: 'Họ và Tên', accessor: 'full_name', width: 170 },
  { Header: 'BNet', accessor: 'is_agent', Cell: RenderIsActive },
  { Header: 'CPanel', accessor: 'is_cpanel', Cell: RenderIsActive },
  { Header: 'Khóa', accessor: 'is_locked', Cell: RenderIsActive },
  { Header: 'NVCS', accessor: 'manage_user_name', width: 170 },
  {
    Header: 'Ngày tạo',
    accessor: 'created',
    width: 250,
    Cell: cell => <>{formatDateTime(cell.row.values.created)}</>
  },
  {
    Header: 'Ngày cập nhật',
    accessor: 'updated',
    width: 250,
    Cell: cell => <>{formatDateTime(cell.row.values.updated)}</>
  },
  {
    id: 'commands',
    Header: '',
    Cell: cell => <Button variant="outlined">Sửa</Button>
  }
];

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { users, hasNext, loading, error } = useSelector(
    state => state.user.filteredUser
  );

  const { userTypes } = useSelector(state => state.user.userType);
  const [curPage, setCurPage] = useState(defaultPage);

  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      keyword_type: keywordTypes[0].value,
      keyword: '',
      is_agent: agentTypes[0].value,
      is_cpanel: cpanelTypes[0].value,
      manage_by: '',
      date_type: dateTypes[0].value,
      start_date: null,
      end_date: null,
      user_type: defaultUserType,
      manage_type: manageTypes[0].value
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const fetchUsers = (params, offset, limit) => {
    params.offset = offset;
    params.limit = limit;

    const { start_date, end_date } = params;
    if (start_date !== null && end_date !== null) {
      // Ngày bắt đầu cần có time là '00:00:00'.
      params.start_date = resetTime(start_date, 0, 0, 0).toISOString();
      // Ngày kết thúc cần có time là '23:59:59'.
      params.end_date = resetTime(end_date, 23, 59, 59, 999).toISOString();
    }

    // Thêm hash url.
    router.push(
      {
        pathname: '/user',
        hash: stringify(params)
      },
      undefined,
      {
        shallow: true
      }
    );

    dispatch(userAction.filterUsers.request(params));
  };

  // Dispatch fetch user types.
  useEffect(() => {
    dispatch(userAction.getUserTypes.request());
  }, []);

  // Set default userType (1st item.id).
  useEffect(() => {
    if (userTypes && userTypes.length > 0) {
      const values = getValues();
      reset({
        ...values,
        user_type:
          values.user_type !== defaultUserType
            ? values.user_type
            : userTypes[0].id
      });
    }
  }, [userTypes]);

  // Get hash params.
  useEffect(() => {
    if (location.hash) {
      const params = parse(location.hash, { parseNumbers: true });

      // Parse string sang date.
      if (params.start_date) {
        params.start_date = new Date(params.start_date);
      }
      if (params.end_date) {
        params.end_date = new Date(params.end_date);
      }

      reset(params);
      setCurPage(params.offset / params.limit);
      fetchUsers(params, params.offset, params.limit);
    }
  }, []);

  const onPageChange = (e, page) => {
    const values = getValues();
    fetchUsers(values, page * defaultLimit, defaultLimit);
    setCurPage(page);
  };

  const onFilterUsers = values => {
    fetchUsers(values, 0, defaultLimit);
    setCurPage(0);
  };

  const onSubmit = e => {
    e.preventDefault();
    // Khi chỉ 1 trong 2 component start_date, end_date có giá trị hợp lệ
    // cần gán giá trị cho component còn lại là ngày hiện tại.
    const [startDate, endDate] = getValues(['start_date', 'end_date']);
    if (startDate !== null || endDate !== null) {
      if (startDate === null || !isDateValid(startDate)) {
        setValue('start_date', new Date());
      } else if (endDate === null || !isDateValid(endDate)) {
        setValue('end_date', new Date());
      }
    }

    handleSubmit(onFilterUsers)();
  };

  const clickAddHandler = () => {
    router.push(
      {
        pathname: '/user/creation',
        hash: ''
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress />
      </Backdrop>

      <Box m={4}>
        <Stack spacing={defaultSpacing}>
          <Paper sx={{ padding: 3 }}>
            <form onSubmit={onSubmit}>
              <Stack spacing={defaultSpacing}>
                <FormControl fullWidth>
                  <InputLabel id="keyword_type_label">Loại từ khóa</InputLabel>
                  <Controller
                    name="keyword_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="keyword_type_label"
                        label="Loại từ khóa"
                        sx={defaultSx}
                        size={defaultSize}
                      >
                        {keywordTypes.map(item => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <Controller
                  name="keyword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={defaultSx}
                      label="Từ khóa"
                      size={defaultSize}
                    />
                  )}
                />

                <FormControl fullWidth>
                  <InputLabel id="agent_type_label">Loại đại lý</InputLabel>
                  <Controller
                    name="is_agent"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="agent_type_label"
                        label="Loại đại lý"
                        sx={defaultSx}
                        size={defaultSize}
                      >
                        {agentTypes.map(item => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="cpanel_type_label">Loại nhân viên</InputLabel>
                  <Controller
                    name="is_cpanel"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="cpanel_type_label"
                        label="Loại nhân viên"
                        sx={defaultSx}
                        size={defaultSize}
                      >
                        {cpanelTypes.map(item => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="user_type_label">Loại khách hàng</InputLabel>
                  <Controller
                    name="user_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="user_type_label"
                        label="Loại khách hàng"
                        sx={defaultSx}
                        size={defaultSize}
                      >
                        {userTypes.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <Controller
                  name="manage_by"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={defaultSx}
                      label="Nhân viên chăm sóc"
                      size={defaultSize}
                    />
                  )}
                />

                <FormControl>
                  <InputLabel id="date_type_label">Loại thời gian</InputLabel>
                  <Controller
                    name="date_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="date_type_label"
                        label="Loại thời gian"
                        sx={defaultSx}
                        size={defaultSize}
                      >
                        {dateTypes.map(item => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <Controller
                  name="start_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Ngày bắt đầu"
                      inputFormat={defaultDateFormat}
                      mask={defaultDateMask}
                      maxDate={watch('end_date') || new Date()}
                      onChange={date => {
                        if (date !== null && isDateValid(date)) {
                          const endDate = getValues('end_date');
                          if (endDate === null) {
                            setValue('end_date', new Date());
                          }
                        }
                        field.onChange(date);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          size={defaultSize}
                          sx={defaultSx}
                          error={!!errors.start_date}
                          helperText={errors.start_date?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Ngày kết thúc"
                      inputFormat={defaultDateFormat}
                      mask={defaultDateMask}
                      minDate={watch('start_date')}
                      maxDate={new Date()}
                      onChange={date => {
                        if (date !== null && isDateValid(date)) {
                          const endDate = getValues('start_date');
                          if (endDate === null) {
                            setValue('start_date', new Date());
                          }
                        }
                        field.onChange(date);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          size={defaultSize}
                          sx={defaultSx}
                          error={!!errors.end_date}
                          helperText={errors.end_date?.message}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
              <Stack
                spacing={defaultSpacing}
                direction="row"
                sx={{ marginTop: 3 }}
              >
                <Button type="submit" variant="outlined" disabled={loading}>
                  Hiển thị
                </Button>
                <Button variant="outlined" onClick={clickAddHandler}>
                  Thêm mới
                </Button>
              </Stack>
            </form>
          </Paper>

          {error !== undefined && (
            <Alert severity="warning">{error.message}</Alert>
          )}

          <DataTable
            columns={columns}
            items={users}
            limit={defaultLimit}
            loading={loading}
            stickyHeader
            mode="unlimited"
            page={curPage}
            hasNext={hasNext}
            onChange={onPageChange}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Account;
