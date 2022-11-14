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
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_FORGOTTEN_PASSWORD_REQUEST,
  USER_FORGOTTEN_PASSWORD_PENDING,
  USER_FORGOTTEN_PASSWORD_FAIL,
  USER_REGISTER_LOGOUT,
  TEACHER_USER_REGISTER_LOGOUT,
  USER_UPDATE_LOGOUT,
} from "../static/constants/userConstants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_REGISTER_LOGOUT });
  dispatch({ type: TEACHER_USER_REGISTER_LOGOUT });
  dispatch({ type: USER_UPDATE_LOGOUT });
};

export const register =
  (name, surname, email, group, password, navigate) => async (dispatch) => {
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

      dispatch({ type: USER_REGISTER_PENDING, payload: data });
      navigate(`/email-wyslany/${email}/${false}`);
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const teacherRegister =
  (name, surname, email, task, isTeacher, password, navigate) =>
  async (dispatch) => {
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

      dispatch({ type: TEACHER_USER_REGISTER_PENDING, payload: data });
      navigate(`/email-wyslany/${email}/${false}`);
    } catch (error) {
      dispatch({
        type: TEACHER_USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
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
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgottenPassword =
  (email, redirectUrl, navigate) => async (dispatch) => {
    try {
      dispatch({ type: USER_FORGOTTEN_PASSWORD_REQUEST });

      const { data } = await axios.post(
        "/users/requestPasswordReset",
        { email, redirectUrl },
        requestConfig
      );

      dispatch({ type: USER_FORGOTTEN_PASSWORD_PENDING, payload: data });

      navigate(`/email-wyslany/${email}/${true}`);
    } catch (error) {
      dispatch({
        type: USER_FORGOTTEN_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const resetPassword =
  (email, password, navigate) => async (dispatch) => {
    try {
      dispatch({ type: USER_RESET_PASSWORD_REQUEST });

      const { data } = await axios.post(
        "/users/resetPassword",
        { email, password },
        requestConfig
      );

      dispatch({ type: USER_FORGOTTEN_PASSWORD_PENDING, payload: data });

      navigate(`/email-wyslany`);
    } catch (error) {
      dispatch({
        type: USER_RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const requestConfig = {
  headers: {
    "Content-type": "application/json",
  },
};
