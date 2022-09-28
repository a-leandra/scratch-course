import axios from "axios";
import {
  ADD_GROUP,
  REMOVE_GROUP,
  REMOVE_STUDENT_FROM_GROUP,
  CHANGE_HOMEWORK,
} from "../static/constants/teacherPanelConst";
import { addNotPassed } from "../reducers/requests";
import { clearRequests } from "../reducers/requests";

export const fetchGroups = (setGroups) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/groups/" + userEmail);
    dispatch(setGroups(response.data));
  } catch (error) {
    //console.log(error);
  }
};

export const fetchStudents = (setStudents) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/users/" + userEmail);
    dispatch(setStudents(response.data));
  } catch (error) {
    //console.log(error);
  }
};

export const addNewGroup = async (name) => {
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  await axios.post("/groups", {
    name: name,
    email: userEmail,
  });
};

export const removeStudentFromGroup = async (param) => {
  const body = {
    email: param.email,
    valueName: "group",
    value: null,
  };
  await axios.post("/users/removeFromGroup", body);
};

export const removeGroup = async (code) => {
  await axios.delete("/groups/" + code);
};

export const changeHomework = async (param) => {
  await axios.put("/groups/homework", {
    code: param.code,
    homework: param.homework,
  });
};

export const submitRequests = (requests) => async (dispatch) => {
  let index = 0;
  for (const request of requests) {
    try {
      await makeRequest(request);
    } catch (error) {
      dispatch(addNotPassed(index));
    }
    index++;
  }
  dispatch(clearRequests());
};

const makeRequest = async (request) => {
  switch (request.type) {
    case ADD_GROUP:
      await addNewGroup(request.param);
      break;
    case REMOVE_GROUP:
      await removeGroup(request.param);
      break;
    case CHANGE_HOMEWORK:
      await changeHomework(request.param);
      break;
    case REMOVE_STUDENT_FROM_GROUP:
      await removeStudentFromGroup(request.param);
      break;
    default:
      throw Object.assign(new Error("Unknown request type."), { code: 404 });
  }
};
