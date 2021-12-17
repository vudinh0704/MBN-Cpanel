import Cookies from 'js-cookie';
import user from '../services/userServices';

export const isBrowser = typeof window !== 'undefined';
export const dev = process.env.NODE_ENV !== 'production';

export const auth = () =>
  new Promise((resolve, reject) => {
    if (isBrowser === false) return reject('');
    const s = localStorage;
    const auth_token = Cookies.get(process.env.AUTH_COOKIE);
    if (dev || auth_token) {
      const token = s.getItem('token');
      let info = {};
      let expire = new Date().getTime();
      try {
        const v = s.getItem('info');
        if (v && v !== '') {
          info = JSON.parse(v);
          if (!info || !info.expire || !info.expire < expire) {
            info = {};
          }
        }
      } catch {
        s.setItem('info', '');
      }
      if (!token || token !== auth_token || !info.id || dev) {
        user
          .self()
          .then(({ response, error }) => {
            if (response) {
              response.expire = expire + 300000;
              s.setItem('info', JSON.stringify(response));
              s.setItem('token', auth_token);
            } else {
              s.setItem('info', '');
              reject(error);
            }
            resolve(response);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        resolve(info);
      }
    } else {
      reject();
    }
  });

export const getUserInfo = () => {
  const info = localStorage.getItem('info') || '';
  if (info === '') return null;
  try {
    return JSON.parse(info);
  } catch (e) {
    return null;
  }
};

export const updateUserInfo = props => {
  let info = getUserInfo();
  if (!info) return;
  try {
    info = { ...info, ...props };
    localStorage.setItem('info', JSON.stringify(info));
  } catch (e) {
    console.log(e);
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem('info');
};
