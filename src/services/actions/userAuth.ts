import {
  registrateNewUserPost,
  authPost,
  logoutPost,
  getUserInfoConf,
  fetchWithRefresh,
  patchUserInfoConf,
  updateAccessTokenPost,
  forgotUserPasswordPost,
  resetUserPasswordPost
} from "../../utils/burger-api";

import { AppDispatch, AppThunk} from '../types';
import { TUserDataServerResponce, TUserAuthForm, TUserDataForm } from "../types/data";


import { setCookie, getCookie, deleteCookie } from "../../utils/cookie-set-get";

const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST' as const;
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS' as const;
const REGISTRATION_FAILED_USER_EXIST = 'REGISTRATION_FAILED_USER_EXIST' as const;
const REGISTRATION_FAILED = 'REGISTRATION_FAILED' as const;

const AUTH_REQUEST = 'AUTH_REQUEST' as const;
const AUTH_SUCCESS = 'AUTH_SUCCESS' as const;
const AUTH_INCORRECT_PASSWORD = 'AUTH_INCORRECT_PASSWORD' as const;
const AUTH_SERVER_FAILED = 'AUTH_FAILED' as const;

const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST' as const;
const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS' as const;
const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED' as const;

const PATCH_USER_INFO_REQUEST = 'PATCH_USER_INFO_REQUEST' as const;
const PATCH_USER_INFO_SUCCESS = 'PATCH_USER_INFO_SUCCESS' as const;
const PATCH_USER_INFO_FAILED = 'PATCH_USER_INFO_FAILED' as const;

const PASSWORD_FORGOT_REQUEST = 'PASSWORD_FORGOT_REQUEST' as const;
const PASSWORD_FORGOT_SUCCESS = 'PASSWORD_FORGOT_SUCCESS' as const;
const PASSWORD_FORGOT_FAILED = 'PASSWORD_FORGOT_FAILED' as const;

const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST' as const;
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS' as const;
const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED' as const;

const UPDATE_ACCESS_TOKEN_REQUEST = 'UPDATE_ACCESS_TOKEN_REQUEST' as const;
const UPDATE_ACCESS_TOKEN_SUCCESS = 'UPDATE_ACCESS_TOKEN_SUCCESS' as const;
const UPDATE_ACCESS_TOKEN_FAILED = 'UPDATE_ACCESS_TOKEN_FAILED' as const;

const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
const LOGOUT_FAILED = 'LOGOUT_FAILED' as const;

const RESET_AUTH_REQUEST_STATUSES = 'RESET_AUTH_REQUEST_STATUSES' as const;
const RESET_AUTH_STATE = 'RESET_AUTH_STATE' as const;


export interface IRegistrateNewUserRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}
export interface IRegistrateNewUserSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
}
export interface IRegistrateNewUserFailedUserExist {
  readonly type: typeof REGISTRATION_FAILED_USER_EXIST;
}
export interface IRegistrateNewUserFailed {
  readonly type: typeof REGISTRATION_FAILED;
}


export interface IAuthRequest {
  readonly type: typeof AUTH_REQUEST;
}
export interface IAuthSuccess {
  readonly type: typeof AUTH_SUCCESS;
  readonly payload: TUserDataServerResponce
}
export interface IAuthFailedIncorrectPassword {
  readonly type: typeof AUTH_INCORRECT_PASSWORD;
}
export interface IAuthFailed {
  readonly type: typeof AUTH_SERVER_FAILED;
}


export interface IFetchUserInfoRequest {
  readonly type: typeof FETCH_USER_INFO_REQUEST;
}
export interface IFetchUserInfoSuccess {
  readonly type: typeof FETCH_USER_INFO_SUCCESS;
  readonly payload: TUserDataServerResponce;
}
export interface IFetchUserInfoFailed {
  readonly type: typeof FETCH_USER_INFO_FAILED;
}


export interface IPatchUserInfoRequest {
  readonly type: typeof PATCH_USER_INFO_REQUEST;
}
export interface IPatchUserInfoSuccess {
  readonly type: typeof PATCH_USER_INFO_SUCCESS;
  readonly payload: TUserDataServerResponce;
}
export interface IPatchUserInfoFailed {
  readonly type: typeof PATCH_USER_INFO_FAILED;
}


export interface IPasswordForgotRequest {
  readonly type: typeof PASSWORD_FORGOT_REQUEST;
}
export interface IPasswordForgotSuccess {
  readonly type: typeof PASSWORD_FORGOT_SUCCESS;
}
export interface IPasswordForgotFailed {
  readonly type: typeof PASSWORD_FORGOT_FAILED;
}


export interface IPasswordResetRequest {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}
export interface IPasswordResetSuccess {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}
export interface IPasswordResetFailed {
  readonly type: typeof PASSWORD_RESET_FAILED;
}


export interface IUpdateAccessTokenRequest {
  readonly type: typeof UPDATE_ACCESS_TOKEN_REQUEST;
}
export interface IUpdateAccessTokenSuccess {
  readonly type: typeof UPDATE_ACCESS_TOKEN_SUCCESS;
}
export interface IUpdateAccessTokenFailed {
  readonly type: typeof UPDATE_ACCESS_TOKEN_FAILED;
}


export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}


export interface IResetAuthRequestStatuses {
  readonly type: typeof RESET_AUTH_REQUEST_STATUSES;
}
export interface IResetAuthState {
  readonly type: typeof RESET_AUTH_STATE;
}


export type TUserAuthActions =
IRegistrateNewUserRequest
| IRegistrateNewUserSuccess
| IRegistrateNewUserFailedUserExist
| IRegistrateNewUserFailed
| IAuthRequest
| IAuthSuccess
| IAuthFailedIncorrectPassword
| IAuthFailed
| IFetchUserInfoRequest
| IFetchUserInfoSuccess
| IFetchUserInfoFailed
| IPatchUserInfoRequest
| IPatchUserInfoSuccess
| IPatchUserInfoFailed
| IPasswordForgotRequest
| IPasswordForgotSuccess
| IPasswordForgotFailed
| IPasswordResetRequest
| IPasswordResetSuccess
| IPasswordResetFailed
| IUpdateAccessTokenRequest
| IUpdateAccessTokenSuccess
| IUpdateAccessTokenFailed
| ILogoutRequest
| ILogoutSuccess
| ILogoutFailed
| IResetAuthRequestStatuses
| IResetAuthState



const registrateNewUser = (authData: TUserDataForm): AppThunk => {
  return function (dispatch: AppDispatch) {
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
      })
      .catch(err => {
        if (err && !err.success) {
          dispatch({
            type: REGISTRATION_FAILED_USER_EXIST,
          })
        } else {
        dispatch({
          type: REGISTRATION_FAILED
        });
      }
        console.error(err);
      });
  }
};

const login = (authData: TUserAuthForm): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    authPost(authData)
      .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken, { 'max-age': 12000, 'path': '/' })
          setCookie('refreshToken', res.refreshToken, { 'max-age': 2500000, 'path': '/' })
          dispatch({
            type: AUTH_SUCCESS,
            payload: { ...res.user }
          })
        }
      })
      .catch(err => {
        if (err && !err.success && err.message === 'email or password are incorrect') {
          dispatch({
            type: AUTH_INCORRECT_PASSWORD
          })
        } else {
          dispatch({
            type: AUTH_SERVER_FAILED
          });
        }
        console.error(err);
      });
  }
};

const logout = (): AppThunk => {
  return async function (dispatch: AppDispatch) {
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

const fetchUserInfo = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FETCH_USER_INFO_REQUEST
    });
    // getUserInfo(getCookie('accessToken'))
    // runWithTokenCheck(getUserInfo)
    fetchWithRefresh(getUserInfoConf.url, getUserInfoConf.options)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FETCH_USER_INFO_SUCCESS,
            payload: { ...res.user }
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

const editUserInfo = (userData: TUserDataForm): AppThunk  => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PATCH_USER_INFO_REQUEST
    });
    // patchUserInfo(getCookie('accessToken'), userData)
    patchUserInfoConf.options.body = JSON.stringify(userData);
    fetchWithRefresh(patchUserInfoConf.url, patchUserInfoConf.options)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PATCH_USER_INFO_SUCCESS,
            payload: { ...res.user }
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

const updateAccessToken = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_ACCESS_TOKEN_REQUEST
    });
    updateAccessTokenPost(getCookie('refreshToken'))
      .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken, { 'max-age': 1200, 'path': '/' })
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

const forgotUserPassword = (email: {email: string}): AppThunk => {
  return function (dispatch: AppDispatch) {
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

const resetUserPassword= (resetPasswordData: {password: string, token: string}): AppThunk  => {
  return function (dispatch: AppDispatch) {
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
