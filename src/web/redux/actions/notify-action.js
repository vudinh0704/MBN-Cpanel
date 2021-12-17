export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  };
};

export const enqueueInfo = (message, options) => {
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      message,
      options: {
        ...options,
        variant: 'info'
      },
      key: new Date().getTime() + Math.random()
    }
  };
};

export const enqueueError = message => {
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      message: message,
      options: {
        variant: 'error'
      },
      key: new Date().getTime() + Math.random()
    }
  };
};

export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key
});
