import { createSlice } from "@reduxjs/toolkit";

export const mapState = createSlice({
  name: "mapState",
  initialState: {
    coordinates: [
      { x: 15, y: 55.5, active: true, current: false, link: "" },
      { x: 35, y: 51.5, active: false, current: true, link: "" },
      { x: 50, y: 61.5, active: false, current: false, link: "" },
      { x: 70, y: 62, active: false, current: false, link: "" },
      { x: 90, y: 60, active: false, current: false, link: "" },
      { x: 80, y: 36, active: false, current: false, link: "" },
      { x: 60, y: 38, active: false, current: false, link: "" },
      { x: 37, y: 31.5, active: false, current: false, link: "" },
      { x: 17, y: 12.5, active: false, current: false, link: "" },
    ],
  },
  reducers: {
    setMapLevels: (state, action) => {
      //console.log(action.payload.index)
      state.coordinates.forEach((c, i) => {
        c.active = i <= action.payload.index;
        c.current = i === action.payload.index;
        c.link = "http://localhost:8602/?" + i + "?" + action.payload.email;
      });
    },
  },
});

export const { setMapLevels } = mapState.actions;

export default mapState.reducer;
