import { addIndex, getPageInfo } from '../../utils';
import { roleAction } from '../actions/role-action';

export const initialState = {
  keyword: '',
  offset: 0,
  limit: 5,
  result: {
    id: 0,
    code: '',
    name: ''
  },
  results: {
    items: [],
    total: 0,
    page: 0,
    pageCount: 0
  },
  loading: false,
  open: false,
  message: {
    type: null,
    content: null
  },
  onDelete: false
};

function roleReducer(state = initialState, action) {
  let { type, response, error, p } = action;

  console.log('action:', action);
  console.log('- type: ', type);
  console.log('- payload:');
  console.log('  + params: ', p); // Defined when type is '..._SUCCESS' or '..._FAILURE'.
  console.log('  + response: ', response); // Defined when type is '..._SUCCESS'.
  console.log('  + error: ', error); // Defined when type is '..._FAILURE'.

  switch (type) {
    // GET (role).
    case roleAction.getRoleById.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case roleAction.getRoleById.SUCCESS: {
      return {
        ...state,
        result: { ...response },
        loading: false
      };
    }

    case roleAction.getRoleById.FAILURE: {
      return {
        ...initialState,
        open: true,
        message: {
          type: 'error',
          content: error.message
        }
      };
    }

    // GET (roles).
    case roleAction.getRoles.REQUEST: {
      let { keyword, offset, limit } = action;

      return {
        ...state,
        keyword: keyword,
        offset: offset,
        limit: limit,
        loading: true
      };
    }

    case roleAction.getRoles.SUCCESS: {
      delete p.type;

      let { role, total } = response;
      let { offset, limit } = p;
      let pageInfo = getPageInfo(offset, limit, total);

      addIndex(role, offset);

      return {
        ...state,
        ...p,
        results: {
          items: role,
          total: total,
          ...pageInfo
        },
        loading: false,
        onDelete: false
      };
    }

    case roleAction.getRoles.FAILURE: {
      return {
        ...initialState,
        open: true,
        message: {
          type: 'error',
          content: error.message
        }
      };
    }

    // GET (users).
    case roleAction.getUsersByRoleId.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case roleAction.getUsersByRoleId.SUCCESS: {
      delete p.type;

      let { offset, limit } = p;
      let total = response.length;
      let pageInfo = getPageInfo(offset, limit, total);

      addIndex(response, offset);

      return {
        ...state,
        ...p,
        results: {
          items: response,
          total: total,
          ...pageInfo
        },
        loading: false
      };
    }

    case roleAction.getUsersByRoleId.FAILURE: {
      return {
        ...initialState,
        loading: false,
        open: true,
        message: {
          type: 'error',
          content: error.message
        }
      };
    }

    // POST.
    case roleAction.addRole.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case roleAction.addRole.SUCCESS: {
      return {
        ...state,
        loading: false,
        open: true,
        message: {
          type: 'success',
          content: response.message
        }
      };
    }

    case roleAction.addRole.FAILURE: {
      return {
        ...initialState,
        open: true,
        message: {
          type: 'error',
          content: error.message
        }
      };
    }

    // PUT.
    case roleAction.editRole.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case roleAction.editRole.SUCCESS: {
      delete p.type;

      return {
        ...state,
        result: { ...p },
        loading: false,
        open: true,
        message: {
          type: 'success',
          content: response.message
        }
      };
    }

    case roleAction.editRole.FAILURE: {
      return {
        ...initialState,
        open: true,
        message: {
          type: 'error',
          content: error.message
        }
      };
    }

    // DELETE.
    case roleAction.deleteRole.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case roleAction.deleteRole.SUCCESS: {
      let {
        offset,
        limit,
        results: { total, page, pageCount }
      } = state;
      let _offset =
        total % limit === 1 && page === pageCount ? offset - limit : offset;

      return {
        ...state,
        offset: _offset,
        loading: false,
        open: true,
        message: {
          type: 'success',
          content: response.message
        },
        onDelete: true
      };
    }

    case roleAction.deleteRole.FAILURE: {
      return {
        ...state,
        loading: false,
        open: true,
        message: {
          type: 'error',
          content: error.message
        }
      };
    }

    // CLEAN.
    case roleAction.CLEAN_MESSAGE: {
      return {
        ...state,
        loading: false,
        open: false
      };
    }

    default:
      return state;
  }
}

export default roleReducer;
