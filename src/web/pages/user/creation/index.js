import * as yup from 'yup';

import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MainContent } from 'components/layout/common';
import { VerifyOtp } from 'components/common';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userAction } from 'redux/actions';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultSx = { width: 350 };

const NewUserInfo = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack spacing={2}>
      <TextField
        disabled
        sx={defaultSx}
        label="Số điện thoại"
        defaultValue={user.phone}
      />

      <TextField
        disabled
        sx={defaultSx}
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        defaultValue={user.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <TextField
        disabled
        sx={defaultSx}
        id="manage_user_name"
        label="Nhân viên chăm sóc"
        defaultValue={user.manage_user_name}
      />
    </Stack>
  );
};

const schema = yup
  .object({
    phone: yup
      .string()
      .matches(/^0\d{9}$/, 'Số điện thoại phải đủ 10 số và bắt đầu bằng số 0')
  })
  .required();

const AccountCreation = ({}) => {
  const {
    control,
    getValues,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phone: ''
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });
  const [openVerifyOtp, setOpenVerifyOtp] = useState(false);

  const { checkPhone, createUser } = useSelector(state => state.user);

  useEffect(() => {
    if (checkPhone.error !== undefined) {
      setError('phone', checkPhone.error);
    }
  }, [checkPhone.error]);

  useEffect(() => {
    if (checkPhone.response?.code === 'success') {
      setOpenVerifyOtp(true);
    }
  }, [checkPhone.response]);

  const dispatch = useDispatch();

  const checkPhoneHandler = values => {
    dispatch(userAction.checkPhone.request(values));
  };

  const closeVerifyOtpHandler = data => {
    setOpenVerifyOtp(false);
    // Nếu có mã xác thực otp thì ms request create user.
    if (data && data.otpVerify) {
      dispatch(
        userAction.createUser.request({
          phone: getValues('phone'),
          otp: data.otp,
          otp_verify: data.otpVerify
        })
      );
    }
  };

  return (
    <MainContent>
      <div style={{ paddingTop: 15 }}>
        <VerifyOtp
          open={openVerifyOtp}
          phone={getValues('phone')}
          captcha="123" // TODO: Sau này áp dụng reCaptcha vào phải handle dữ liệu này.
          isRegister={true}
          sendOtpWhenOpen={true}
          closeHandler={closeVerifyOtpHandler}
        />

        {createUser.user === undefined ? (
          <form onSubmit={handleSubmit(checkPhoneHandler)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="phone_to_creation"
                    label="Số điện thoại"
                    sx={defaultSx}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    inputProps={{ maxLength: 10 }}
                  />
                )}
              />

              <Button variant="outlined" sx={defaultSx} type="submit">
                Tiếp tục
              </Button>
            </Stack>
          </form>
        ) : (
          <NewUserInfo user={createUser.user} />
        )}
      </div>
    </MainContent>
  );
};

export default AccountCreation;
