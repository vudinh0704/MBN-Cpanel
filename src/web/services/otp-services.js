import { useApi } from './api';

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;
const usePublicApi = () => useApi(IDENTITY_API_URL, false);

export const otpServices = {
  sendOtp: p => usePublicApi().post('/v1/otps/send', p),
  verifyOtp: p => usePublicApi().post('/v1/otps/verify', p)
};
