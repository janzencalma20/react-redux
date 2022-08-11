import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {axiosInstance}  from '../utils/axios'

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  canAutoLogin: false,
  user: null,
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh')
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },

  PASSWORD_RESET_SUCCESS: (state) => {
    return {
      ...state
    }
  },

  PASSWORD_RESET_FAIL: (state) => {
    return {
      ...state
    }
  },

  AUTO_LOGIN_SUCCESS: (state, action) => {
    return {
      ...state,
      canAutoLogin: true,
      user: action.payload
    }
  },

  AUTHENTICATED_SUCCESS: (state) => {
    return {
      ...state,
      isAuthenticated: true
    }
  },

  LOGIN_SUCCESS: (state, action) => {
    const { payload } = action;
    localStorage.setItem('access', payload.access);
    localStorage.setItem('refresh', payload.refresh);
    return {
      ...state,
      access: payload.access,
      refresh: payload.refresh
    };
  },

  USER_LOADED_SUCCESS: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload
    }
  },

  AUTO_LOGIN_FAIL: (state) => {
    return {
      ...state,
      canAutoLogin: false,
      user: null
    }
  },

  AUTHENTICATED_FAIL: (state) => {
    return {
      ...state,
      isAuthenticated: false
    }
  },

  USER_LOADED_FAIL: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    }
  },

  LOGIN_FAIL: (state) => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return {
      ...state,
      access: null,
      refresh: null,
      isAuthenticated: false,
      canAutoLogin: false,
      user: null
    }
  },

  LOGOUT: (state) => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return {
      ...state,
      isAuthenticated: false,
      canAutoLogin: false,
      user: null,
      access: null,
      refresh: null
    }
  },

  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  resetPasswordConfirm: () => Promise.resolve(),
  changePassword: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    checkAutoLogin();
  }, []);

  const checkAutoLogin = async () => {
    if (localStorage.getItem('refresh')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const body = { token: localStorage.getItem('refresh') };

      try {
        const res = await axios.post(`/api/auth/jwt/verify/`, body, config);

        if (res.data.code !== 'token_not_valid') {
          try {
            const res = await axiosInstance.get(`/auth/users/me/`);
            dispatch({
              type: 'AUTO_LOGIN_SUCCESS',
              payload: res.data
            })
          } catch (e) {
            dispatch({
              type: 'AUTO_LOGIN_FAIL'
            })
          }
        } else {
          dispatch({
            type: 'AUTO_LOGIN_FAIL'
          })
        }
      } catch (e) {
        dispatch({
          type: 'AUTO_LOGIN_FAIL'
        })
      }
    } else {
      dispatch({
        type: 'AUTO_LOGIN_FAIL'
      })
    }
  };

  const loadUser = async () => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };

      try {
        const res = await axios.get(`/api/auth/users/me/`, config);
        dispatch({
          type: 'USER_LOADED_SUCCESS',
          payload: res.data
        })
      } catch (e) {
        dispatch({
          type: 'USER_LOADED_FAIL'
        })
      }
    } else {
      dispatch({
        type: 'USER_LOADED_FAIL'
      })
    }
  };

  const login = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = {email, password};

    try {
      const res = await axios.post(`/api/auth/jwt/create/`, body, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      await loadUser();
    } catch (e) {
      dispatch({
        type: 'LOGIN_FAIL'
      });
      return e;
    }
  };

  const register = async (username,email, password) => {
    const response = await axios.post('/api/auth/register/', {
      username,
      email,
      password,

    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email });
    
    try {
      await axios.post(`/api/auth/users/reset_password/`, body, config);

      dispatch({
        type: 'PASSWORD_RESET_SUCCESS'
      });
    } catch (e) {
      dispatch({
        type: 'PASSWORD_RESET_FAIL'
      });
    }
  };

  const resetPasswordConfirm = async (uid, token, new_password, re_new_password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    const res = await axios.post(`/api/auth/users/reset_password_confirm/`, body, config);
  };

  const changePassword = async (id, new_password) => {
    const request = { id, new_password };
    return await axiosInstance.put(`/machine/user/change_password/`, request);
  };

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        resetPasswordConfirm,
        changePassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
