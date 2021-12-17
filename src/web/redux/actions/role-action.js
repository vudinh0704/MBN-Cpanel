import { createRequestTypes, utilAction } from './index';
import { action } from './util-action';
import { takeEvery } from 'redux-saga/effects';
import { userServices } from '../../services';

export const roleAction = {
  addRole: { ...createRequestTypes('ROLE_ADD') },
  deleteRole: { ...createRequestTypes('ROLE_DELETE') },
  editRole: { ...createRequestTypes('ROLE_EDIT') },
  getRoleById: { ...createRequestTypes('ROLE_GET_ROLE') },
  getRoles: { ...createRequestTypes('ROLE_GET_ROLES') },
  getUsersByRoleId: { ...createRequestTypes('ROLE_GET_USERS') },

  CLEAN_MESSAGE: 'ROLE_CLEAN_MESSAGE',
  cleanMessage: () => action(roleAction.CLEAN_MESSAGE, {}),

  // Saga watchers.
  saga: {
    *watchAll() {
      const saga = roleAction.saga;
      const items = [
        saga.watchAddRole,
        saga.watchdeleteRole,
        saga.watchEditRole,
        saga.watchGetRoleById,
        saga.watchGetRoles,
        saga.watchGetUsersByRoleId
      ];

      yield utilAction.watchAll(items);
    },

    *watchAddRole() {
      yield takeEvery(roleAction.addRole.REQUEST, addRole);
    },

    *watchdeleteRole() {
      yield takeEvery(roleAction.deleteRole.REQUEST, deleteRole);
    },

    *watchEditRole() {
      yield takeEvery(roleAction.editRole.REQUEST, editRole);
    },

    *watchGetRoleById() {
      yield takeEvery(roleAction.getRoleById.REQUEST, getRoleById);
    },

    *watchGetRoles() {
      yield takeEvery(roleAction.getRoles.REQUEST, getRoles);
    },

    *watchGetUsersByRoleId() {
      yield takeEvery(roleAction.getUsersByRoleId.REQUEST, getUsersByRoleId);
    },

    *watchCleanMessage() {
      yield takeEvery(roleAction.CLEAN_MESSAGE, cleanMessage);
    }
  }
};

const addRole = utilAction.bind(roleAction.addRole, userServices.addRole);
const deleteRole = utilAction.bind(
  roleAction.deleteRole,
  userServices.deleteRole
);
const editRole = utilAction.bind(roleAction.editRole, userServices.editRole);
const getRoleById = utilAction.bind(
  roleAction.getRoleById,
  userServices.getRoleById
);
const getRoles = utilAction.bind(roleAction.getRoles, userServices.getRoles);
const getUsersByRoleId = utilAction.bind(
  roleAction.getUsersByRoleId,
  userServices.getUsersByRoleId
);
