import { takeEvery } from '@redux-saga/core/effects';
import { utilAction } from '.';
import { userServices } from '../../services';
import { createRequestTypes } from './util-action';

export const userAction = {
  login: { ...createRequestTypes('USER_LOGIN') },
  logout: { ...createRequestTypes('USER_LOGOUT') },
  SHOW_LOGIN: 'USER_SHOW_LOGIN',
  showLogin: p => action(user.SHOW_LOGIN, { p, response: p }),
  NOTIFICATION: 'USER_NOTIFICATION',
  notification: (p, response) => action(user.NOTIFICATION, { p, response }),
  self: { ...createRequestTypes('USER_SELF') },
  savedFavorite: { ...createRequestTypes('USER_SAVED_FAVORITE') },
  removeFavorite: { ...createRequestTypes('USER_REMOVE_FAVORITE') },
  inboxes: {
    latest: { ...createRequestTypes('USER_INBOXES_LATEST') },
    markAsRead: { ...createRequestTypes('USER_INBOXES_MARK_AS_READ') },
    delete: { ...createRequestTypes('USER_INBOXES_DELETE') },
    deleteAll: { ...createRequestTypes('USER_INBOXES_DELETE_ALL') }
  },
  getSetting: { ...createRequestTypes('USER_GET_SETTING') },
  updateSetting: { ...createRequestTypes('USER_UPDATE_SETTING') },

  getById: { ...createRequestTypes('USER_GET_BY_ID') },
  compactCpanels: { ...createRequestTypes('USER_COMPACT_CPANELS') },

  // User management.
  filterUsers: { ...createRequestTypes('USER_FILTER_USERS') },
  getUserTypes: { ...createRequestTypes('USER_GET_USER_TYPES') },

  checkPhone: { ...createRequestTypes('USER_CHECK_PHONE') },
  createUser: { ...createRequestTypes('USER_CREATE_USER') },

  saga: {
    *watchAll() {
      const saga = userAction.saga;
      const items = [
        saga.watchFilterUsers,
        saga.watchGetUserTypes,
        saga.watchCheckPhone,
        saga.watchCreateuser
      ];
      yield utilAction.watchAll(items);
    },
    *watchFilterUsers() {
      yield takeEvery(userAction.filterUsers.REQUEST, filterUsers);
    },
    *watchGetUserTypes() {
      yield takeEvery(userAction.getUserTypes.REQUEST, getUserTypes);
    },

    *watchCheckPhone() {
      yield takeEvery(userAction.checkPhone.REQUEST, checkPhone);
    },
    *watchCreateuser() {
      yield takeEvery(userAction.createUser.REQUEST, createUser);
    }
  }
};

const filterUsers = utilAction.bind(
  userAction.filterUsers,
  userServices.filterUsers
);
const getUserTypes = utilAction.bind(
  userAction.getUserTypes,
  userServices.getUserTypes
);

const checkPhone = utilAction.bind(
  userAction.checkPhone,
  userServices.checkPhone
);
const createUser = utilAction.bind(
  userAction.createUser,
  userServices.createUser
);
