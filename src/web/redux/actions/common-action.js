import { createRequestTypes } from './util-action';

export const suggest = {
  filter: { ...createRequestTypes('SUGGEST_FILTER') }
};

export const cdn = {
  uploadAvatar: { ...createRequestTypes('CDN_UPLOAD_AVATAR') }
};
