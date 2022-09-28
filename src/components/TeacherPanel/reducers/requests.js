import { createSlice } from "@reduxjs/toolkit";
import { REMOVE_GROUP } from "../static/constants/teacherPanelConst";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    notPassed: [],
  },
  reducers: {
    addRequest(state, action) {
      if (checkIfRequestCorrect(state.requests, action.payload)) {
        state.requests.push(action.payload);
      }
    },
    removeRequest(state, action) {
      state.requests = state.requests.filter(
        (req) => req !== state.requests[action.payload]
      );
    },
    clearRequests(state) {
      state.requests = [];
    },
    addNotPassed(state, action) {
      state.notPassed.push(state.requests[action.payload].info);
    },
    clearNotPassed(state) {
      state.notPassed = [];
    },
  },
});

const checkIfRequestCorrect = (requests, newReq) => {
  if (doesExist(requests, newReq) || isExclusionary(requests, newReq)) {
    return false;
  }
  return true;
};

const doesExist = (requests, newReq) => {
  const infos = requests.map((req) => req.info);
  if (infos.includes(newReq.info)) {
    return true;
  }
  return false;
};

const isExclusionary = (requests, newReq) => {
  if (typeof newReq.param.code === "undefined") {
    return false;
  }
  const removalCodes = requests
    .filter((req) => {
      return req.type === REMOVE_GROUP;
    })
    .map((req) => req.param);
  if (removalCodes.includes(newReq.param.code)) {
    return true;
  }
  return false;
};

export const {
  addRequest,
  clearRequests,
  removeRequest,
  addNotPassed,
  clearNotPassed,
} = requestSlice.actions;

export default requestSlice.reducer;
