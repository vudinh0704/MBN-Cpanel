import * as yup from 'yup';
import { Button, Container, Stack, TextField, Divider } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { parse, stringify } from 'query-string';
import { SnackbarWrapper } from 'components/common';
import { MainContent } from 'components/layout/common';
import { resources } from 'resources';
import { roleAction } from 'redux/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { onlyAlphabetAndNumeric } from 'utils';
import Link from 'next/link';

const AddRoleSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required(resources.role.roleCodeIsRequired)
      .min(3, resources.role.roleCodeIsInvalidLength)
      .matches(onlyAlphabetAndNumeric, resources.role.roleCodeIsInvalid),
    name: yup.string().required(resources.role.roleNameIsRequired)
  })
  .required();

const AddRole = () => {
  // Init.
  const dispatch = useDispatch();

  const state = useSelector(state => state.role);

  const { keyword, offset, limit, message, open } = state;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    resolver: yupResolver(AddRoleSchema),
    mode: 'onBlur',
    defaultValues: {
      code: '',
      name: ''
    }
  });

  // Effects.

  // Functions.
  const handleClean = () => {
    dispatch(roleAction.cleanMessage());
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    dispatch(roleAction.addRole.request({ ...data }));

    handleClean();

    reset(
      { ...null },
      {
        keepDirty: false,
        keepDefaultValues: true,
        keepValues: false
      }
    );
  };

  // Render.
  return (
    <MainContent>
      <Container maxWidth="sm">
        <h1>Add a role</h1>

        <br />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            <>
              <Controller
                name="code"
                control={control}
                render={({ field: { value, name, ref, onBlur, onChange } }) => (
                  <TextField
                    type="text"
                    id={name}
                    label="Code"
                    value={value}
                    inputProps={{ maxLength: 50 }}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors.code}
                    helperText={errors.code ? errors.code?.message : ''}
                    inputRef={ref}
                  />
                )}
              />

              <Controller
                name="name"
                control={control}
                render={({ field: { value, name, ref, onBlur, onChange } }) => (
                  <TextField
                    type="text"
                    id={name}
                    label="Tên vai trò"
                    value={value}
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
              Tạo mới
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
      </Container>

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

export default AddRole;
