import axios from "axios";

export const fetchGroups = (setGroups) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/groups/" + userEmail);
    dispatch(setGroups(response.data));
  } catch (error) {
    //
  }
};

export const fetchStudents = (setStudents) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/users/" + userEmail);
    dispatch(setStudents(response.data));
  } catch (error) {
    //
  }
};
