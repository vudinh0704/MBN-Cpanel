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
import { useDispatch, useSelector } from 'react-redux';

import { MainContent } from 'components/layout/common';
import { Title } from 'components/common/title';
import { functionAction } from 'redux/actions';
import { memo } from 'react';
import { onlyAlphabetAndNumeric } from 'utils';
import { resources } from 'resources';
import styles from 'pages/function/function.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';

const addFunctionSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required(resources.func.functionCodeIsRequired)
      .min(3, resources.func.functionCodeIsInvalidLength)
      .matches(onlyAlphabetAndNumeric, resources.func.functionCodeIsInvalid),
    name: yup.string().required(resources.func.functionNameIsRequired),
    description: yup.string(),
    is_active: yup.string()
  })
  .required();

const AddFunction = () => {
  // init
  const dispatch = useDispatch();

  const { message, open, loading } = useSelector(state => state.func);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    resolver: yupResolver(addFunctionSchema),
    mode: 'onBlur',
    defaultValues: {
      code: '',
      name: '',
      description: '',
      is_active: 'true'
    }
  });

  //functions
  const onSubmit = (data, e) => {
    e.preventDefault();

    dispatch(functionAction.addFunction.request({ ...data }));

    cleanMessage();

    reset(
      { ...null },
      {
        keepDirty: false,
        keepDefaultValues: true,
        keepValues: false
      }
    );
  };

  const cleanMessage = () => {
    dispatch(functionAction.cleanMessage());
  };

  return (
    <>
      <MainContent>
        <div style={{ paddingTop: 15 }}>
          <Title
            name="Chức năng: Thêm mới"
            url="/function"
            onClick={() => {
              cleanMessage();
            }}
          />
          <form className={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
            <Loading loading={loading} />
            <Stack direction="column" spacing={5}>
              <Controller
                name="code"
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <TextField
                    id={name}
                    label="Mã chức năng"
                    type="text"
                    value={value}
                    inputProps={{ maxLength: 50 }}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={!!errors.code}
                    helperText={errors.code ? errors.code?.message : ''}
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
                    type="text"
                    value={value}
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
                render={({ field: { onChange, onBlur, value, name } }) => (
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
                Thêm
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

export default memo(AddFunction);
