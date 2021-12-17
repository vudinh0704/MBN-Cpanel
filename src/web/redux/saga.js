import 'isomorphic-unfetch';

import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import { category, otpAction, userAction } from './actions';

import { api } from '../services/api';
import es6promise from 'es6-promise';
import { functionAction, roleAction } from './actions';
import { userServices } from '../services';

//import { enqueueError as notifyError, enqueueInfo as notifyInfo } from './actions/notifyAction'

es6promise.polyfill();

export const isBrowser = typeof window !== 'undefined';

function* fetchEntity(act, apiFn, p) {
  const { response, success } = yield call(apiFn, p);

  if (success) {
    yield put(act.success(p, response));
    // if (response.showNotification && response.message) {
    //   yield put(notifyInfo(response.message));
    // }
    return response;
  } else {
    yield put(act.failure(p, response));

    // if (response) {
    //   yield put(notifyError(response.message));
    // }
    return null;
  }
}

// export const getTopicByCode = fetchEntity.bind(null, category, api.getTopicByCode);
// export const getTopicMajors = fetchEntity.bind(null, category.majors, api.getTopicMajors);
//export const getUserInfo = fetchEntity.bind(null, user.userInfo, api.user.info)
export const login = fetchEntity.bind(
  null,
  userAction.login,
  userServices.login
);
export const getCompactCpanels = fetchEntity.bind(
  null,
  userAction.compactCpanels,
  userServices.compactCpanels
);
export const getUserById = fetchEntity.bind(
  null,
  userAction.getById,
  userServices.getById
);

function* authorize(phone, password, captcha) {
  try {
    const resp = yield call(login, { phone, password, captcha });
    yield put(userAction.login.success(resp));
    return resp.access_token;
  } catch (error) {
    yield put(userAction.login.failure(p, error));
  }
}

function* logout() {
  try {
    //const resp = yield call(logout)
    yield put(userAction.logout.success());
    return resp.access_token;
  } catch (error) {
    yield put(userAction.logout.failure(null, error));
  }
}

function* watchLoginFlow() {
  while (true) {
    const { phone, password, captcha } = yield take(userAction.login.REQUEST);
    const token = yield call(authorize, phone, password, captcha);
    if (token) {
      api.addCache('token', token);
      yield take(userAction.logout.REQUEST);
      yield call(logout);
      api.removeCache('token');
    }
  }
}

function* rootSaga() {
  yield all([
    call(watchLoginFlow),
    call(functionAction.saga.watchAll),
    call(userAction.saga.watchAll),
    call(otpAction.saga.watchAll),
    call(roleAction.saga.watchAll)
  ]);
}

export default rootSaga;
