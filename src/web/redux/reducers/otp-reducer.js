import { otpAction } from '../actions';

const initialState = {
  sendOtp: { loading: false, response: undefined, error: undefined },
  verifyOtp: { loading: false, otpVerify: undefined, error: undefined }
};

export default function otpReducer(state = initialState, action) {
  const res = action.response || {};
  switch (action.type) {
    // Send otp.
    case otpAction.sendOtp.REQUEST:
      return {
        ...state,
        sendOtp: {
          loading: true,
          response: undefined,
          error: undefined
        }
      };
    case otpAction.sendOtp.SUCCESS:
      return {
        ...state,
        sendOtp: { ...state.sendOtp, loading: false, response: res }
      };
    case otpAction.sendOtp.FAILURE:
      return {
        ...state,
        sendOtp: { ...state.sendOtp, loading: false, error: action.error }
      };

    // Verify otp.
    case otpAction.verifyOtp.REQUEST:
      return {
        ...state,
        verifyOtp: {
          loading: true,
          otpVerify: undefined,
          error: undefined
        }
      };
    case otpAction.verifyOtp.SUCCESS:
      return {
        ...state,
        verifyOtp: {
          ...state.verifyOtp,
          loading: false,
          otpVerify: res.otp_verify
        }
      };
    case otpAction.verifyOtp.FAILURE:
      return {
        ...state,
        verifyOtp: { ...state.verifyOtp, loading: false, error: action.error }
      };
    default:
      return state;
  }
}
