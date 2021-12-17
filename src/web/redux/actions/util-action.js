import { all, call, fork, put } from 'redux-saga/effects';

export function createRequestTypes(base) {
  let resp = ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
  return {
    ...resp,
    request: p => action(resp.REQUEST, p),
    success: (p, response) => action(resp.SUCCESS, { p, response }),
    failure: (p, error) => action(resp.FAILURE, { p, error })
  };
}

export function createActions(act) {
  return {
    request: p => action(act.REQUEST, p),
    success: (p, response) => action(act.SUCCESS, { p, response }),
    failure: (p, error) => action(act.FAILURE, { p, error })
  };
}

export function action(type, payload = {}) {
  // console.log({ type: type, payload: payload });
  return { type, ...payload };
}

export const utilAction = {
  *fetchEntity(act, apiFn, p) {
    const p1 = { ...p };
    delete p1.type;
    const { response, success } = yield call(apiFn, p1);
    if (success) {
      yield put(act.success(p, response));
      return response;
    } else {
      yield put(act.failure(p, response));
      return null;
    }
  },
  *watchAll(items) {
    yield all(
      items.map(saga =>
        call(function* () {
          while (true) {
            try {
              yield call(saga);
              break;
            } catch (e) {
              console.log(e);
            }
          }
        })
      )
    );
  },
  bind: (act, apiFn) => utilAction.fetchEntity.bind(null, act, apiFn)
};
