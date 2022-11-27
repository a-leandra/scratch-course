import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_PENDING,
  USER_REGISTER_SUCCESS,
  TEACHER_USER_REGISTER_FAIL,
  TEACHER_USER_REGISTER_REQUEST,
  TEACHER_USER_REGISTER_PENDING,
  TEACHER_USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_REGISTER_LOGOUT,
  TEACHER_USER_REGISTER_LOGOUT,
  USER_UPDATE_LOGOUT,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_PENDING,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_FORGOTTEN_PASSWORD_REQUEST,
  USER_FORGOTTEN_PASSWORD_PENDING,
  USER_FORGOTTEN_PASSWORD_SUCCESS,
  USER_FORGOTTEN_PASSWORD_FAIL,
  USER_ACTIVATE_ACCOUNT_REQUEST,
  USER_ACTIVATE_ACCOUNT_PENDING,
  USER_ACTIVATE_ACCOUNT_SUCCESS,
  USER_ACTIVATE_ACCOUNT_FAIL,
} from "../static/constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_PENDING:
      return { loading: false };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const teacherUserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_USER_REGISTER_REQUEST:
      return { loading: true };
    case TEACHER_USER_REGISTER_PENDING:
      return { loading: false };
    case TEACHER_USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case TEACHER_USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEACHER_USER_REGISTER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_UPDATE_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userForgottenPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOTTEN_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOTTEN_PASSWORD_PENDING:
      return { loading: false };
    case USER_FORGOTTEN_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_FORGOTTEN_PASSWORD_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_PENDING:
      return { loading: false };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const userActivateAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIVATE_ACCOUNT_REQUEST:
      return { loading: true };
    case USER_ACTIVATE_ACCOUNT_PENDING:
      return { loading: false };
    case USER_ACTIVATE_ACCOUNT_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_ACTIVATE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
