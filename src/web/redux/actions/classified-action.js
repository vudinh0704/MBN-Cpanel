import { createRequestTypes } from './util-action';

export const classified = {
  getById: { ...createRequestTypes('CLASSIFIED_GET_BY_ID') },
  getClassifieds: { ...createRequestTypes('CLASSIFIED_GET_CLASSIFIEDS') },
  SHOW_REPORT: 'CLASSIFIED_SHOW_REPORT',
  showReport: p => action(classified.SHOW_REPORT, { p })
};
