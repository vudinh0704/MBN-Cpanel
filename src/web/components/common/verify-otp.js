import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { otpAction } from 'redux/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const propTypes = {
  /**
   * Cờ xác định có mở Dialog hay không.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * Số điện thoại để gửi Otp.
   */
  phone: PropTypes.string,
  /**
   * Captcha.
   */
  captcha: PropTypes.string,
  /**
   * Cờ xác định gửi mã Otp để đăng kí tài khoản hay không.
   * @default false
   */
  isRegister: PropTypes.bool,
  /**
   * Gọi api gửi otp khi mở Dialog.
   * @default false
   */
  sendOtpWhenOpen: PropTypes.bool,
  /**
   * Callback được gọi khi đóng Dialog,
   * params là thông tin verify otp (phone, otp, otp_verify).
   */
  closeHandler: PropTypes.func
};

const defaultProps = {
  open: false,
  phone: '',
  captcha: '',
  isRegister: false,
  sendOtpWhenOpen: false,
  closeHandler: () => void 0
};

const schema = yup
  .object({
    otp: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Phải là ký tự số và có độ dài bằng 6')
  })
  .required();

export const VerifyOtp = ({
  open,
  phone,
  captcha,
  isRegister,
  sendOtpWhenOpen,
  closeHandler
}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      otp: ''
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });
  const { sendOtp, verifyOtp } = useSelector(state => state.otp);

  const dispatch = useDispatch();

  const sendOtpHandler = () => {
    dispatch(
      otpAction.sendOtp.request({ phone, captcha, is_register: isRegister })
    );
  };

  // Gửi mã OTP khi mở dialog.
  useEffect(() => {
    if (open && sendOtpWhenOpen && phone) {
      sendOtpHandler();
    }
  }, [open]);

  useEffect(() => {
    if (verifyOtp.otpVerify) {
      closeHandler({
        otp: getValues('otp'),
        phone,
        otpVerify: verifyOtp.otpVerify
      });
    }
  }, [verifyOtp.otpVerify]);

  const verifyOtpHandler = values => {
    dispatch(otpAction.verifyOtp.request({ ...values, phone, captcha }));
  };

  const copyOtpVerifyHandler = () => {
    navigator.clipboard.writeText(verifyOtp.otpVerify);
  };

  return (
    <Dialog open={open} maxWidth={false}>
      <form onSubmit={handleSubmit(verifyOtpHandler)}>
        <DialogTitle>Xác thực số điện thoại {phone}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
              alignContent: 'center',
              alignItems: 'center'
            }}
          >
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="otp"
                  label="Mã xác thực OTP"
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                  inputProps={{ maxLength: 6 }}
                />
              )}
            />

            <DialogContentText>Chưa nhận được mã OTP?</DialogContentText>
            <Button sx={{ maxWidth: 100 }} onClick={sendOtpHandler}>
              Gửi lại
            </Button>

            {verifyOtp.otpVerify && (
              <DialogContentText>
                Mã xác thực otp: {verifyOtp.otpVerify}
                <Button
                  title="Sao chép"
                  startIcon={<ContentCopyIcon />}
                  onClick={copyOtpVerifyHandler}
                />
              </DialogContentText>
            )}

            {/* Error */}
            {sendOtp.error && (
              <Alert severity="error">{sendOtp.error.message}</Alert>
            )}
            {sendOtp.response && <Alert>{sendOtp.response.message}</Alert>}

            {verifyOtp.error && (
              <Alert severity="error">{verifyOtp.error.message}</Alert>
            )}
            {/* End of Error */}
          </Box>
          <DialogActions>
            <Button
              variant="outlined"
              disabled={
                Object.keys(errors).length > 0 ||
                verifyOtp.otpVerify !== undefined
              }
              type="submit"
            >
              Xác thực OTP
            </Button>
            <Button variant="outlined" onClick={closeHandler}>
              Đóng
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};

VerifyOtp.propTypes = propTypes;
VerifyOtp.defaultProps = defaultProps;
