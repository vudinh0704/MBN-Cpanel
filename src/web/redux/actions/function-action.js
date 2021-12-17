import { createRequestTypes, utilAction } from './index';

import { action } from './util-action';
import { takeEvery } from 'redux-saga/effects';
import { userServices } from '../../services';

export const singleFunctionActions = {
  CLEAN_MESSAGE: 'FUNCTION_CLEAN_MESSAGE',
  IS_ACTIVE: 'FUNCTION_FILTER_IS_ACTIVE'
};

export const functionAction = {
  addFunction: { ...createRequestTypes('FUNCTION_ADD') },
  cleanMessage: () => action(singleFunctionActions.CLEAN_MESSAGE, {}),
  deleteFunctionById: { ...createRequestTypes('FUNCTION_DELETE_BY_ID') },
  editFunctionById: { ...createRequestTypes('FUNCTION_EDIT_BY_ID') },
  getFunctionById: { ...createRequestTypes('FUNCTION_GET_BY_ID') },
  getFunctions: { ...createRequestTypes('FUNCTION_GET_ALL') },
  getRolesByFunctionId: { ...createRequestTypes('FUNCTION_GET_ROLES') },

  // Saga watchers
  saga: {
    *watchAll() {
      const saga = functionAction.saga;
      const items = [
        saga.watchAddFunction,
        saga.watchDeleteFunctionById,
        saga.watchEditFunctionById,
        saga.watchGetFunctionById,
        saga.watchGetFunctions,
        saga.watchGetRolesByFunctionID
      ];
      yield utilAction.watchAll(items);
    },

    *watchAddFunction() {
      yield takeEvery(functionAction.addFunction.REQUEST, addFunction);
    },

    *watchDeleteFunctionById() {
      yield takeEvery(
        functionAction.deleteFunctionById.REQUEST,
        deleteFunctionById
      );
    },

    *watchEditFunctionById() {
      yield takeEvery(
        functionAction.editFunctionById.REQUEST,
        editFunctionById
      );
    },

    *watchGetFunctionById() {
      yield takeEvery(functionAction.getFunctionById.REQUEST, getFunctionById);
    },

    *watchGetFunctions() {
      yield takeEvery(functionAction.getFunctions.REQUEST, getFunctions);
    },

    *watchGetRolesByFunctionID() {
      yield takeEvery(
        functionAction.getRolesByFunctionId.REQUEST,
        getRolesByFunctionId
      );
    }
  }
};

const addFunction = utilAction.bind(
  functionAction.addFunction,
  userServices.addFunction
);

const deleteFunctionById = utilAction.bind(
  functionAction.deleteFunctionById,
  userServices.deleteFunctionById
);

const editFunctionById = utilAction.bind(
  functionAction.editFunctionById,
  userServices.editFunctionById
);

const getFunctionById = utilAction.bind(
  functionAction.getFunctionById,
  userServices.getFunctionById
);

const getFunctions = utilAction.bind(
  functionAction.getFunctions,
  userServices.getFunctions
);

const getRolesByFunctionId = utilAction.bind(
  functionAction.getRolesByFunctionId,
  userServices.getRolesByFunctionId
);
