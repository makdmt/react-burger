import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED_USER_EXIST,
  REGISTRATION_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_INCORRECT_PASSWORD,
  AUTH_SERVER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILED,
  PATCH_USER_INFO_REQUEST,
  PATCH_USER_INFO_SUCCESS,
  PATCH_USER_INFO_FAILED,
  UPDATE_ACCESS_TOKEN_REQUEST,
  UPDATE_ACCESS_TOKEN_SUCCESS,
  UPDATE_ACCESS_TOKEN_FAILED,
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAILED,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  RESET_AUTH_REQUEST_STATUSES,
  RESET_AUTH_STATE,

} from '../actions/userAuth'

import type { TUserAuthActions } from '../actions/userAuth'
import type { TUserDataServerResponce } from '../types/data'

interface IUserAuthState {
  registrationRequest: boolean,
  registrationFailedUserExist: boolean,
  registrationFailed: boolean,
  registrationSuccess: boolean,
  authRequest: boolean,
  authIncorrectPassword: boolean,
  authServerFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
  logoutSuccess: boolean,
  fetchUserInfoRequest: boolean,
  fetchUserInfoFailed: boolean,
  patchUserInfoRequest: boolean,
  patchUserInfoFailed: boolean,
  patchUserInfoSuccess: boolean,
  updateAccessTokenRequest: boolean,
  updateAccessTokenSuccess: boolean,
  updateAccessTokenFailed: boolean,
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,
  forgotPasswordSuccess: boolean,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
  resetPasswordSuccess: boolean,
  authUser: null | TUserDataServerResponce,
}

const initialState: IUserAuthState = {
  registrationRequest: false,
  registrationFailedUserExist: false,
  registrationFailed: false,
  registrationSuccess: false,
  authRequest: false,
  authIncorrectPassword: false,
  authServerFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  logoutSuccess: false,
  fetchUserInfoRequest: false,
  fetchUserInfoFailed: false,
  patchUserInfoRequest: false,
  patchUserInfoFailed: false,
  patchUserInfoSuccess: false,
  updateAccessTokenRequest: false,
  updateAccessTokenSuccess: false,
  updateAccessTokenFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,
  authUser: null,
}

export const userAuthReducer = (state: IUserAuthState = initialState, action: TUserAuthActions): IUserAuthState => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...initialState,
        registrationRequest: true
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationSuccess: true
      }
    }
    case REGISTRATION_FAILED_USER_EXIST: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailedUserExist: true
      }
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true
      }
    }
    case AUTH_REQUEST: {
      return {
        ...initialState,
        authRequest: true,
      }
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authUser: action.payload
      }
    }
    case AUTH_INCORRECT_PASSWORD: {
      return {
        ...state,
        authRequest: false,
        authIncorrectPassword: true
      }
    }
    case AUTH_SERVER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authServerFailed: true
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutSuccess: false,
        logoutFailed: false
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: true,
        authUser: null
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      }
    }
    case FETCH_USER_INFO_REQUEST: {
      return {
        ...state,
        authUser: null,
        fetchUserInfoRequest: true,
        fetchUserInfoFailed: false
      }
    }
    case FETCH_USER_INFO_SUCCESS: {
      return {
        ...state,
        fetchUserInfoRequest: false,
        authUser: { ...action.payload}
      }
    }
    case FETCH_USER_INFO_FAILED: {
      return {
        ...state,
        fetchUserInfoRequest: false,
        fetchUserInfoFailed: true
      }
    }
    case PATCH_USER_INFO_REQUEST: {
      return {
        ...state,
        patchUserInfoRequest: true
      }
    }
    case PATCH_USER_INFO_SUCCESS: {
      return {
        ...state,
        patchUserInfoRequest: false,
        patchUserInfoSuccess: true,
        authUser: { ...action.payload}
      }
    }
    case PATCH_USER_INFO_FAILED: {
      return {
        ...state,
        patchUserInfoRequest: false,
        patchUserInfoFailed: true
      }
    }

    case UPDATE_ACCESS_TOKEN_REQUEST: {
      return {
        ...state,
        updateAccessTokenRequest: true,
        updateAccessTokenFailed: false,
        updateAccessTokenSuccess: false,
        authUser: null,
      }
    }

    case UPDATE_ACCESS_TOKEN_SUCCESS: {
      return {
        ...state,
        updateAccessTokenRequest: false,
        updateAccessTokenSuccess: true
      }
    }
    case UPDATE_ACCESS_TOKEN_FAILED: {
      return {
        ...state,
        updateAccessTokenRequest: false,
        updateAccessTokenFailed: true
      }
    }
    case PASSWORD_FORGOT_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      }
    }
    case PASSWORD_FORGOT_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true
      }
    }
    case PASSWORD_FORGOT_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true
      }
    }

    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true
      }
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true
      }
    }
    case RESET_AUTH_REQUEST_STATUSES: {
      return {
        ...initialState,
        authUser: state.authUser
      }
    }
    case RESET_AUTH_STATE: {
      return {
        ...initialState
      }
    }

    default: {
      return state;
    }
  }
}
