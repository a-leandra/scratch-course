import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  TEACHER_USER_REGISTER_FAIL,
  TEACHER_USER_REGISTER_REQUEST,
  TEACHER_USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../static/constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      "/users/login",
      { email, password },
      requestConfig
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(getErrAction(error, USER_LOGIN_FAIL));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (name, surname, email, group, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const { data } = await axios.post(
        "/users",
        {
          name,
          surname,
          email,
          group,
          password,
        },
        requestConfig
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(getErrAction(error, USER_REGISTER_FAIL));
    }
  };

export const teacherRegister =
  (name, surname, email, task, isTeacher, password) => async (dispatch) => {
    try {
      dispatch({ type: TEACHER_USER_REGISTER_REQUEST });

      const { data } = await axios.post(
        "/users",
        {
          name,
          surname,
          email,
          task,
          isTeacher,
          password,
        },
        requestConfig
      );

      dispatch({ type: TEACHER_USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(getErrAction(error, TEACHER_USER_REGISTER_FAIL));
    }
  };

export const update = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const requestAuthConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/users/profil", user, requestAuthConfig);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(getErrAction(error, USER_UPDATE_FAIL));
  }
};

const requestConfig = {
  headers: {
    "Content-type": "application/json",
  },
};

const getErrAction = (error, type) => {
  return {
    type: type,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
};
