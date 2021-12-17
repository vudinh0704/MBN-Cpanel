import { userAction } from '../actions';

export const initialState = {
  latest: { total: 0, is_view_more: false, items: [] },
  items: [],
  page: 0,
  offset: 0
};

function markAsRead(items, id) {
  const found = items.find(e => e.id === id);
  if (found) found.is_read = true;
  return found !== null;
}

function deleteMessage(items, id) {
  return items.filter(m => {
    return m.id !== id;
  });
}

function inboxReducer(state = initialState, action) {
  if (typeof action.response === undefined) {
    return state;
  }
  const acts = userAction.inboxes;
  switch (action.type) {
    case acts.markAsRead.SUCCESS: {
      const { id } = action.p;
      markAsRead(state.latest.items, id);
      markAsRead(state.items, id);
      state.latest.total = Math.max(0, state.latest.total - 1);
      return { ...state };
    }
    case acts.delete.SUCCESS: {
      const { id, is_read } = action.p;
      let items1 = deleteMessage(state.latest.items, id);
      let items2 = deleteMessage(state.items, id);
      let total = state.latest.total;
      if (!is_read) {
        total = Math.max(0, total - 1);
      }
      let latest = { ...latest, total: total, items: items1 };
      return {
        ...state,
        items: items2,
        latest: { ...latest, total: total, items: items1 }
      };
    }
    default:
      return state;
  }
}

export default inboxReducer;
