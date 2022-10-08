import groupSearchReducer from "../components/TeacherPanel/reducers/groupSearch";
import studentSearchReducer from "../components/TeacherPanel/reducers/studentSearch";
import userState from "./userState";
import pageState from "./pageState";

import {
  userLoginReducer,
  userRegisterReducer,
  teacherUserRegisterReducer,
  userUpdateReducer,
} from "./userReducers";

const reducers = {
  groupSearch: groupSearchReducer,
  studentSearch: studentSearchReducer,
  userState: userState,
  pageState: pageState,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  teacherUserRegister: teacherUserRegisterReducer,
  userUpdate: userUpdateReducer,
};

export default reducers;
