import * as yup from 'yup';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Loading, SnackbarWrapper } from 'components/common';
import { memo, useEffect } from 'react';
import { parse, stringify } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';

import { MainContent } from 'components/layout/common';
import { Title } from 'components/common/title';
import { functionAction } from 'redux/actions';
import { resources } from 'resources';
import styles from 'pages/function/function.module.scss';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

const editFunctionSchema = yup
  .object()
  .shape({
    id: yup.number().required(),
    code: yup.string(),
    name: yup.string().required(resources.func.functionNameIsRequired),
    description: yup.string(),
    is_active: yup.string()
  })
  .required();

const EditFunction = () => {
  // init
  const dispatch = useDispatch();

  const { message, open, func, loading, functions } = useSelector(
    state => state.func
  );
  const { offset, limit, keyword, is_active } = functions;

  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    resolver: yupResolver(editFunctionSchema),
    mode: 'onBlur',
    defaultValues: {
      id: 0,
      code: '',
      name: '',
      description: '',
      is_active: 'true'
    }
  });

  //functions
  const getFunctionById = ({ id }) => {
    dispatch(functionAction.getFunctionById.request({ id }));
  };

  const cleanMessage = () => {
    dispatch(functionAction.cleanMessage());
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    const { id } = data;

    cleanMessage();

    dispatch(functionAction.editFunctionById.request({ ...data }));

    reset({ ...data }, { keepDirty: false });

    router.push(
      {
        pathname: '/function/edit',
        hash: stringify({ id })
      },
      undefined,
      { shallow: true }
    );
  };

  // effect
  useEffect(() => {
    const { value, _id } = func;
    const { id } = parse(location.hash, { parseNumbers: true });
    if (id != _id || !value) {
      getFunctionById({ id });
    } else {
      reset({ ...value });
    }
  }, [func]);

  return (
    <>
      <MainContent>
        <div style={{ paddingTop: 15 }}>
          <Title
            name="Chức năng: Sửa"
            url={{
              pathname: '/function',
              hash: stringify({ offset, limit, keyword, is_active })
            }}
            onClick={() => cleanMessage()}
          />

          <form className={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
            <Loading loading={loading} />
            <Stack direction="column" spacing={5}>
              <Controller
                name="code"
                control={control}
                render={({ field: { value, name, ref } }) => (
                  <TextField
                    disabled
                    id={name}
                    label="Mã chức năng"
                    value={value}
                    inputRef={ref}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <TextField
                    id={name}
                    label="Tên chức năng"
                    value={value}
                    type="text"
                    inputProps={{ maxLength: 150 }}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name?.message : ''}
                    inputRef={ref}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <TextField
                    id={name}
                    label="Mô tả"
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                  />
                )}
              />

              <Controller
                name="is_active"
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <FormControl style={{ width: 200 }}>
                    <InputLabel id="is-active-label" variant="outlined">
                      Active
                    </InputLabel>
                    <Select
                      labelId="is-active-label"
                      id={name}
                      label="Active"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      <MenuItem value="true">Sử dụng</MenuItem>
                      <MenuItem value="false">Không sử dụng</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ maxWidth: 200, alignSelf: 'flex-end' }}
                color="primary"
                disabled={!isDirty || isSubmitting}
              >
                Áp dụng
              </Button>
            </Stack>
          </form>

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

export default memo(EditFunction);
