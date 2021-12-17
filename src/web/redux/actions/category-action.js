import { createRequestTypes } from './util-action';

export const category = {
  majors: { ...createRequestTypes('CATEGORY_MAJORS') },
  getByParent: { ...createRequestTypes('CATEGORY_GET_BY_PARENT') }
};
