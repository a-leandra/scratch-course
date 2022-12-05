import axios from "axios";
import {
  ADD_GROUP,
  REMOVE_GROUP,
  REMOVE_STUDENT_FROM_GROUP,
  CHANGE_HOMEWORK,
} from "../static/constants/teacherPanelConst";
import {
  addGroup,
  removeGroup,
  changeHomeworkOfGroup,
} from "../reducers/groupSearch";
import {
  setStudentGroupAndPrepareData,
  changeHomeworkTo,
  removeStudent,
} from "../reducers/studentSearch";

export const fetchGroups = (setGroups) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/api/groups/" + userEmail);
    dispatch(setGroups(response.data));
  } catch (error) {
    //console.log(error);
  }
};

export const fetchStudents = (setStudents) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/api/users/" + userEmail);
    dispatch(setStudents(response.data));
  } catch (error) {
    //console.log(error);
  }
};

export const addNewGroup = async (name) => {
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  const response = await axios.post("/groups", {
    name: name,
    email: userEmail,
  });
  return response.data;
};

export const removeStudentFromGroup = async (param) => {
  const body = {
    email: param.email,
    valueName: "group",
    value: null,
  };
  await axios.post("/api/users/removeFromGroup", body);
};

export const removeOldGroup = async (code) => {
  await axios.delete("/groups/" + code);
};

export const changeHomework = async (param) => {
  await axios.put("/groups/homework", {
    code: param.code,
    homework: param.homework,
  });
};

export const tryToMakeRequest = async (request, dispatch) => {
  try {
    await makeRequest(request, dispatch);
  } catch (error) {
    console.log(error); // TODO: handle errors
  }
};

const makeRequest = async (request, dispatch) => {
  // TODO: rename
  switch (request.type) {
    case ADD_GROUP:
      const group = await addNewGroup(request.param);
      dispatch(addGroup(group));
      break;
    case REMOVE_GROUP:
      await removeOldGroup(request.param);
      dispatch(removeGroup(request.param));
      dispatch(setStudentGroupAndPrepareData({})); // TODO: check before changing
      break;
    case CHANGE_HOMEWORK:
      await changeHomework(request.param);
      dispatch(changeHomeworkTo(request.param.homework)); // change homeworks of set group
      dispatch(changeHomeworkOfGroup(request.param)); // change homework from saved groups
      break;
    case REMOVE_STUDENT_FROM_GROUP:
      await removeStudentFromGroup(request.param);
      dispatch(removeStudent(request.param.email));
      break;
    default:
      throw Object.assign(new Error("Unknown request type."), { code: 404 });
  }
};
