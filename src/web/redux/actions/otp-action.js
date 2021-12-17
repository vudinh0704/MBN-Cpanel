import { takeEvery } from '@redux-saga/core/effects';
import { createRequestTypes, utilAction } from '.';
import { otpServices } from '../../services';

export const otpAction = {
  sendOtp: { ...createRequestTypes('OTP_SEND_OTP') },
  verifyOtp: { ...createRequestTypes('OTP_VERIFY_OTP') },

  saga: {
    *watchAll() {
      const saga = otpAction.saga;
      const items = [saga.sendOtp, saga.verifyOtp];
      yield utilAction.watchAll(items);
    },
    *sendOtp() {
      yield takeEvery(otpAction.sendOtp.REQUEST, sendOtp);
    },
    *verifyOtp() {
      yield takeEvery(otpAction.verifyOtp.REQUEST, verifyOtp);
    }
  }
};

const sendOtp = utilAction.bind(otpAction.sendOtp, otpServices.sendOtp);
const verifyOtp = utilAction.bind(otpAction.verifyOtp, otpServices.verifyOtp);
