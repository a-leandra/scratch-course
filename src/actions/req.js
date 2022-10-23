import axios from "axios";
export const fetchLastTask = (setMapLevels) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/users/task/" + userEmail);
    dispatch(setMapLevels({ email: userEmail, index: response.data }));
  } catch (error) {
    //console.log(error);
  }
};
