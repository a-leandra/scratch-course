import axios from "axios";
import bcrypt from "bcryptjs";

export const fetchLastTask = (setMapLevels) => async (dispatch) => {
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    const response = await axios.get("/users/task/" + userEmail);
    //let salt = await bcrypt.genSalt(10);
    //let emailHashed = await bcrypt.hash(userEmail, salt);
    dispatch(setMapLevels({ email: userEmail, index: response.data }));
  } catch (error) {
    //console.log(error);
  }
};
