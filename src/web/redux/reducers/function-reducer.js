import { addIndex, getPageInfo } from '../../utils';
import { functionAction, singleFunctionActions } from '../actions';

export const initialState = {
  isFirstLoad: true,
  loading: false,
  message: { type: null, content: null },
  open: false,

  func: { value: {}, _id: 0 },

  functions: {
    items: [],
    total: 0,

    page: 0,
    pageCount: 0,

    // GET /functions's params
    keyword: '',
    is_active: '',
    offset: 0,
    limit: 20
  },

  roles: {
    items: [],
    page: 0,
    pageCount: 0,
    total: 0,

    // GET /roles/by-function's params
    keyword: '',
    offset: 0,
    limit: 20
  }
};

function functionReducer(state = initialState, action) {
  let res = action.response || {};
  let p = action.p || {};
  switch (action.type) {
    // GET: BY ID
    case functionAction.getFunctionById.SUCCESS: {
      return { ...state, func: { value: res, _id: p.id }, loading: false };
    }

    case functionAction.getFunctionById.REQUEST: {
      return { ...state, loading: true, open: false };
    }

    case functionAction.getFunctionById.FAILURE: {
      return {
        ...state,
        loading: false,
        open: true,
        message: { type: 'error', content: action.error.message }
      };
    }

    // GET: ALL
    case functionAction.getFunctions.SUCCESS: {
      const pageInfo = getPageInfo(p.offset, p.limit, res.total);
      const functions = res.functions;
      addIndex(functions, p.offset);
      return {
        ...state,
        isFirstLoad: false,
        functions: { items: functions, ...p, ...pageInfo, total: res.total },
        loading: false
      };
    }

    case functionAction.getFunctions.REQUEST: {
      return {
        ...state,
        roles: { ...initialState.roles },
        loading: true
      };
    }

    case functionAction.getFunctions.FAILURE: {
      return {
        ...initialState,
        isFirstLoad: false,
        loading: false,
        open: true,
        message: { type: 'error', content: action.error.message }
      };
    }

    // GET: ROLES BY FUNCTIONID
    case functionAction.getRolesByFunctionId.SUCCESS: {
      const pageInfo = getPageInfo(p.offset, p.limit, res.total);
      const roles = res.roles;
      addIndex(roles, p.offset);
      return {
        ...state,
        roles: { items: roles, ...p, ...pageInfo, total: res.total },
        loading: false
      };
    }

    case functionAction.getRolesByFunctionId.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case functionAction.getRolesByFunctionId.FAILURE: {
      return {
        ...initialState,
        loading: false,
        open: true,
        message: { type: 'error', content: action.error.message }
      };
    }

    // POST
    case functionAction.addFunction.SUCCESS: {
      return {
        ...state,
        loading: false,
        open: true,
        message: { type: 'success', content: action.response.message }
      };
    }

    case functionAction.addFunction.REQUEST: {
      return { ...state, loading: true };
    }

    case functionAction.addFunction.FAILURE: {
      return {
        ...state,
        loading: false,
        open: true,
        message: { type: 'error', content: action.error.message }
      };
    }

    // PUT
    case functionAction.editFunctionById.SUCCESS: {
      return {
        ...state,
        loading: false,
        open: true,
        message: { type: 'success', content: action.response.message }
      };
    }

    case functionAction.editFunctionById.REQUEST: {
      return { ...state, loading: true };
    }

    case functionAction.editFunctionById.FAILURE: {
      return {
        ...state,
        loading: true,
        open: true,
        message: { type: 'error', content: action.error.message }
      };
    }

    // DELETE
    case functionAction.deleteFunctionById.SUCCESS: {
      return {
        ...state,
        functions: {
          ...state.functions,
          items: [...state.functions.items.filter(item => item.id != p.id)]
        },
        loading: false,
        open: true,
        message: { type: 'success', content: action.response.message }
      };
    }

    case functionAction.deleteFunctionById.REQUEST: {
      return { ...state, loading: true };
    }

    case functionAction.deleteFunctionById.FAILURE: {
      return {
        ...state,
        loading: false,
        open: true,
        message: { type: 'error', content: action.error.message }
      };
    }

    // CLEAN MESSAGE
    case singleFunctionActions.CLEAN_MESSAGE: {
      return { ...state, open: false, message: { type: null, content: null } };
    }

    default:
      return state;
  }
}

export default functionReducer;
