import axios from "axios";
import bcrypt from "bcryptjs";

export const fetchLastTask = (setMapLevels) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/api/users/task/" + userEmail);
    //let salt = await bcrypt.genSalt(10);
    //let emailHashed = await bcrypt.hash(userEmail, salt);
    dispatch(setMapLevels({ email: userEmail, index: response.data }));
  } catch (error) {
    //console.log(error);
  }
};

export const fetchHomework = (setHomework) => async (dispatch) => {
  const isTeacher = JSON.parse(localStorage.getItem("userInfo")).isTeacher;
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  if(!isTeacher) {
    const response = await axios.get("/api/users/homework/" + userEmail);
    if(response.data !== null && response.data !== undefined) {
      dispatch(setHomework(response.data));
    }
  }
}