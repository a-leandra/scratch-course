import axios from "axios";

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
  try {
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    console.log(name, userEmail);
    const response = await axios.post("/groups", {
      name: name,
      email: userEmail,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const removeStudent = async (email) => {
  try {
    await axios.delete("/users/" + email);
  } catch (error) {
    //console.log(error);
  }
};

export const changeHomework = async (code, homework) => {
  try {
    await axios.put("/groups/homework", {
      code: code,
      homework: homework,
    });
  } catch (error) {
    // console.log(error);
  }
};
