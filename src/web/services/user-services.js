import { stringify } from 'query-string';
import { useApi } from './api';

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;
const usePublicApi = () => useApi(IDENTITY_API_URL, false);
const usePrivateApi = () => useApi(IDENTITY_API_URL, true);

export const userServices = {
  login: p => usePublicApi().post('/v1/users/login', p),
  self: () => usePrivateApi().get('/v1/users/self', null, 'GET'),
  logout: () => usePrivateApi().post('/v1/users/logout'),
  getSetting: () => usePrivateApi().post('/v1/users/get-setting'),
  updateSetting: p => usePrivateApi().put('/v1/users/update-setting', p),
  getMessagses: p => usePrivateApi().get('/v1/users/get-notifications', p),
  readMessage: p =>
    usePrivateApi().put(`/v1/users/read-message?${stringify(p)}`),
  deleteMessage: p =>
    usePrivateApi().delete(`/v1/users/delete-message?${stringify(p)}`),
  readAllMessages: () => usePrivateApi().put(`/v1/users/read-all-messages`),
  getById: p => usePrivateApi().get(`/v1/users/${p.id}`, null, true),

  compactCpanels: () => usePrivateApi().get(`/v1/users/compact-cpanels`),

  getUserTypes: () => usePrivateApi().get('/v1/users/user-types'),
  filterUsers: params => usePrivateApi().get(`/v1/users?${stringify(params)}`),

  checkPhone: p => usePrivateApi().post('/v1/users/check-phone', p),
  createUser: p => usePrivateApi().post('/v1/users/create', p),

  addFunction: p => usePrivateApi().post(`/v1/functions`, p),
  deleteFunctionById: p => usePrivateApi().delete(`/v1/functions/${p.id}`, p),
  editFunctionById: p => usePrivateApi().put(`/v1/functions/${p.id}`, p),
  getFunctionById: p => usePrivateApi().get(`/v1/functions/${p.id}`),
  getFunctions: p => usePrivateApi().get(`/v1/functions?${stringify(p)}`),
  getRolesByFunctionId: p =>
    usePrivateApi().get(`/v1/roles/by-function?${stringify(p)}`),

  addRole: p => usePrivateApi().post(`/v1/roles`, p),
  deleteRole: p => usePrivateApi().delete(`/v1/roles/${p.id}`),
  editRole: p => usePrivateApi().put(`/v1/roles/${p.id}`, p),
  getRoleById: p => usePrivateApi().get(`/v1/roles/${p.id}`, p),
  getRoles: p => usePrivateApi().get(`/v1/roles?${stringify(p)}`),
  getUsersByRoleId: p =>
    usePrivateApi().get(
      `/v1/roles/${p.id}/users?keyword=${p.keyword}&offset=${p.offset}&limit=${p.limit}`
    )
};
