import {
   registrateNewUserPost,
   authPost,
   logoutPost,
   getUserInfo,
   patchUserInfo,
   updateAccessTokenPost,
   forgotUserPasswordPost,
   resetUserPasswordPost } from "../../utils/burger-api";


import { setCookie, getCookie, deleteCookie } from "../../utils/cookie-set-get";

const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
const REGISTRATION_FAILED_USER_EXIST = 'REGISTRATION_FAILED_USER_EXIST';
const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_INCORRECT_PASSWORD = 'AUTH_INCORRECT_PASSWORD';
const AUTH_SERVER_FAILED = 'AUTH_FAILED';

const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED';

const PATCH_USER_INFO_REQUEST = 'PATCH_USER_INFO_REQUEST';
const PATCH_USER_INFO_SUCCESS = 'PATCH_USER_INFO_SUCCESS';
const PATCH_USER_INFO_FAILED = 'PATCH_USER_INFO_FAILED';

const PASSWORD_FORGOT_REQUEST = 'PASSWORD_FORGOT_REQUEST';
const PASSWORD_FORGOT_SUCCESS = 'PASSWORD_FORGOT_SUCCESS';
const PASSWORD_FORGOT_FAILED = 'PASSWORD_FORGOT_FAILED';

const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';

const UPDATE_ACCESS_TOKEN_REQUEST = 'UPDATE_ACCESS_TOKEN_REQUEST';
const UPDATE_ACCESS_TOKEN_SUCCESS = 'UPDATE_ACCESS_TOKEN_SUCCESS';
const UPDATE_ACCESS_TOKEN_FAILED = 'UPDATE_ACCESS_TOKEN_FAILED';

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILED = 'LOGOUT_FAILED';

const RESET_AUTH_REQUEST_STATUSES = 'RESET_AUTH_REQUEST_STATUSES';
const RESET_AUTH_STATE = 'RESET_AUTH_STATE';


function registrateNewUser(authData) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST
    });
    registrateNewUserPost(authData)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: REGISTRATION_SUCCESS,
          })
        }
        if (res && !res.success) {
          dispatch({
            type: REGISTRATION_FAILED_USER_EXIST,
          })
        }
      })
      .catch(err => {
        dispatch({
          type: REGISTRATION_FAILED
        });
        console.error(err);
      });
  }
};

function login(authData) {
  return function (dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    authPost(authData)
      .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken, {'max-age': 1200, 'path': '/'})
          setCookie('refreshToken', res.refreshToken, {'max-age': 2500000, 'path': '/'})
          dispatch({
            type: AUTH_SUCCESS,
            payload: {...res.user}
          })
      }
      if (res && !res.success && res.message === 'email or password are incorrect') {
        dispatch({
          type: AUTH_INCORRECT_PASSWORD
        })
    }
  })
      .catch(err => {
        // if (err?.body) {
        //   console.log(err.body);
        // }
        dispatch({
          type: AUTH_SERVER_FAILED
        });
        console.error(err);
      });
  }
};

function logout() {
  return async function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logoutPost(getCookie('refreshToken'))
      .then(res => {
        if (res && res.success) {
            dispatch({
            type: LOGOUT_SUCCESS,
          })
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        }
      })
      .catch(err => {
        dispatch({
          type: LOGOUT_FAILED
        });
        console.error(err);
      });
  }
};

function fetchUserInfo() {
  return function (dispatch) {
    dispatch({
      type: FETCH_USER_INFO_REQUEST
    });
    getUserInfo(getCookie('accessToken'))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FETCH_USER_INFO_SUCCESS,
            payload: {...res.user}
          })
        }
      })
      .catch(err => {
        dispatch({
          type: FETCH_USER_INFO_FAILED
        });
        console.error(err);
      });
  }
};

function editUserInfo(userData) {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_INFO_REQUEST
    });
    patchUserInfo(getCookie('accessToken'), userData)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PATCH_USER_INFO_SUCCESS,
            payload: {...res.user}
          })
        }
      })
      .catch(err => {
        dispatch({
          type: PATCH_USER_INFO_FAILED
        });
        console.error(err);
      });
  }
};

function updateAccessToken() {
  return function (dispatch) {
    dispatch({
      type: UPDATE_ACCESS_TOKEN_REQUEST
    });
    updateAccessTokenPost(getCookie('refreshToken'))
      .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken, {'max-age': 1200, 'path': '/'})
          dispatch({
            type: UPDATE_ACCESS_TOKEN_SUCCESS
          })
        }
      })
      .catch(err => {
        dispatch({
          type: UPDATE_ACCESS_TOKEN_FAILED
        });
        console.error(err);
      });
  }
};

function forgotUserPassword(email) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_FORGOT_REQUEST
    });
    forgotUserPasswordPost(email)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_FORGOT_SUCCESS,
          })
        }
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_FORGOT_FAILED
        });
        console.error(err);
      });
  }
};

function resetUserPassword(resetPasswordData) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST
    });
    resetUserPasswordPost(resetPasswordData)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_RESET_SUCCESS,
          })
        }
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_RESET_FAILED
        });
        console.error(err);
      });
  }
};




export {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED_USER_EXIST,
  REGISTRATION_FAILED,
  registrateNewUser,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_INCORRECT_PASSWORD,
  AUTH_SERVER_FAILED,
  login,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  logout,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILED,
  fetchUserInfo,
  PATCH_USER_INFO_REQUEST,
  PATCH_USER_INFO_SUCCESS,
  PATCH_USER_INFO_FAILED,
  editUserInfo,
  UPDATE_ACCESS_TOKEN_REQUEST,
  UPDATE_ACCESS_TOKEN_SUCCESS,
  UPDATE_ACCESS_TOKEN_FAILED,
  updateAccessToken,
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAILED,
  forgotUserPassword,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  resetUserPassword,
  RESET_AUTH_REQUEST_STATUSES,
  RESET_AUTH_STATE,
}
