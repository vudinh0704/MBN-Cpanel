import { userAction, cdn } from '../actions';
const initialState = {
  roles: [],
  setting: {},
  user_uid: null,
  id: 0,
  self: {},
  token: null,
  show_login: false,
  is_login: false,

  compactCpanels: [],
  getById: null,

  filteredUser: {
    users: [],
    hasNext: false,
    loading: false,
    error: undefined
  },
  userType: {
    userTypes: [],
    error: undefined
  },

  checkPhone: { loading: false, response: undefined, error: undefined },
  createUser: { loading: false, user: undefined, error: undefined }
};
const user = userAction;
function userReducer(state = initialState, action) {
  const resp = action.response || {};

  switch (action.type) {
    case user.login.SUCCESS: {
      return { ...state, is_login: true, token: resp.access_token };
    }
    case user.logout.SUCCESS: {
      return { ...initialState };
    }
    case user.self.SUCCESS: {
      return { ...state, id: resp.id, user_uid: resp.user_uid, self: resp };
    }
    case user.SHOW_LOGIN: {
      return { ...state, show_login: resp };
    }

    // upload:begin
    case cdn.uploadAvatar.REQUEST: {
      return { ...state, ...{ loading: true } };
    }
    case cdn.uploadAvatar.SUCCESS: {
      return { ...state, ...{ loading: false } };
    }
    case cdn.uploadAvatar.FAILURE: {
      return { ...state, ...{ loading: false } };
    }
    // upload:end

    // setting:begin
    case user.getSetting.REQUEST: {
      return { ...state, loading: true };
    }
    case user.getSetting.SUCCESS: {
      return { ...state, loading: false, setting: resp || {} };
    }
    case user.getSetting.FAILURE: {
      return { ...state, loading: false, setting: { error: action.error } };
    }
    case user.updateSetting.REQUEST: {
      let setting = { ...state.setting, ...action.p };
      return { ...state, setting };
    }
    // setting:end

    case user.compactCpanels.SUCCESS: {
      return { ...state, compactCpanels: resp };
    }
    case user.getById.SUCCESS: {
      return { ...state, getById: resp };
    }

    // cpanels.
    case user.filterUsers.REQUEST:
      return {
        ...state,
        filteredUser: {
          ...state.filteredUser,
          loading: true,
          error: undefined
        }
      };
    case user.filterUsers.SUCCESS: {
      // Add 'index' property.
      const { p } = action;
      const users = resp.cpanels.map((user, index) => ({
        ...user,
        index: p.offset + index + 1
      }));
      return {
        ...state,
        filteredUser: {
          ...state.filteredUser,
          users,
          hasNext: resp.has_next,
          loading: false,
          error: undefined
        }
      };
    }
    case user.filterUsers.FAILURE:
      return {
        ...state,
        filteredUser: {
          ...state.filteredUser,
          users: [],
          loading: false,
          error: action.error
        }
      };

    // User types.
    case user.getUserTypes.REQUEST:
      return { ...state };
    case user.getUserTypes.SUCCESS: {
      // Mapping giá trị cho component.
      const userTypes = resp.map(item => ({
        id: item.user_types.id,
        name: item.user_types.name
      }));
      return { ...state, userType: { userTypes, error: undefined } };
    }
    case user.getUserTypes.FAILURE:
      return {
        ...state,
        userType: { ...state.userType, error: action.error }
      };

    // Check phone.
    case user.checkPhone.REQUEST:
      return {
        ...state,
        checkPhone: { ...state.checkPhone, loading: true, error: undefined }
      };

    case user.checkPhone.SUCCESS:
      return {
        ...state,
        checkPhone: {
          ...state.checkPhone,
          response: resp,
          loading: false,
          error: undefined
        }
      };

    case user.checkPhone.FAILURE:
      return {
        ...state,
        checkPhone: { ...state.checkPhone, loading: false, error: action.error }
      };

    // Create user.
    case user.createUser.REQUEST:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          loading: true,
          user: undefined,
          error: undefined
        }
      };

    case user.createUser.SUCCESS:
      return {
        ...state,
        createUser: { ...state.createUser, loading: false, user: resp }
      };

    case user.createUser.FAILURE:
      return {
        ...state,
        createUser: { ...state.createUser, loading: false, error: action.error }
      };

    default:
      return state;
  }
}

export default userReducer;
