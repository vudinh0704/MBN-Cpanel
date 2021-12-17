import * as yup from 'yup';
import { memo, useEffect } from 'react';
import { Button, Container, Divider, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarWrapper } from 'components/common';
import { MainContent } from 'components/layout/common';
import { resources } from 'resources';
import { roleAction } from 'redux/actions';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { parse, stringify } from 'query-string';
import Link from 'next/link';

const EditRoleSchema = yup
  .object()
  .shape({
    id: yup.number().required(),
    code: yup.string().required(),
    name: yup.string().required(resources.role.roleNameIsRequired)
  })
  .required();

const EditRole = () => {
  // Init.
  const router = useRouter();

  const dispatch = useDispatch();

  const state = useSelector(state => state.role);

  const { keyword, offset, limit, result, open, message } = state;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    resolver: yupResolver(EditRoleSchema),
    mode: 'onBlur',
    defaultValues: {
      id: 0,
      code: '',
      name: ''
    }
  });

  // Effects.
  useEffect(() => {
    const { id } = parse(location.hash, { parseNumbers: true });

    result.id !== id ? getRoleById({ id }) : reset({ ...result });
  }, [result]);

  // Functions.
  const getRoleById = ({ id }) => {
    dispatch(roleAction.getRoleById.request({ id }));
  };

  const handleClean = () => {
    dispatch(roleAction.cleanMessage());
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    const { id } = data;

    handleClean();

    dispatch(roleAction.editRole.request({ ...data }));

    reset({ ...data }, { keepDirty: false });

    router.push(
      {
        pathname: '/role/edit',
        hash: stringify({ id })
      },
      undefined,
      { shallow: true }
    );
  };

  // Render.
  return (
    <MainContent>
      <Container maxWidth="sm">
        <h1>Edit role</h1>

        <br />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            <>
              <Controller
                name="code"
                control={control}
                render={({ field: { value, name, ref } }) => (
                  <TextField
                    disabled
                    id={name}
                    label="Code"
                    value={value}
                    inputRef={ref}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field: { value, name, ref, onBlur, onChange } }) => (
                  <TextField
                    id={name}
                    label="Tên vai trò"
                    value={value}
                    type="text"
                    inputProps={{ maxLength: 150 }}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name?.message : ''}
                    inputRef={ref}
                  />
                )}
              />
            </>

            <Button
              type="submit"
              sx={{ height: '3.5rem' }}
              variant="contained"
              color="primary"
              disabled={!isDirty || isSubmitting}
            >
              Áp dụng
            </Button>

            <Link
              href={{
                pathname: '/role',
                hash: stringify({ keyword, offset, limit })
              }}
              passHref
            >
              <Button style={{ height: '3.5rem' }} variant="contained">
                Back
              </Button>
            </Link>
          </Stack>
        </form>

        {state && state.message && (
          <SnackbarWrapper
            id={message.type}
            open={open}
            handleClose={() => handleClean}
            color={message.type}
            content={message.content}
          />
        )}
      </Container>
    </MainContent>
  );
};

export default memo(EditRole);
