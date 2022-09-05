import groupSearchReducer from "./teacherPanel/groupSearch";
import studentSearchReducer from "./teacherPanel/studentSearch";
import userState from "./userState";
import pageState from "./pageState";
import { configureStore } from "@reduxjs/toolkit";

const reducers = {
  groupSearch: groupSearchReducer,
  studentSearch: studentSearchReducer,
  userState: userState,
  pageState: pageState,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
