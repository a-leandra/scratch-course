import { createSlice } from "@reduxjs/toolkit";

export const mapState = createSlice({
  name: "mapState",
  initialState: {
    coordinates: [
      { x: 15, y: 55.5, active: true, current: false, link: "" },
      { x: 38, y: 51.5, active: false, current: false, link: "" },
      { x: 56, y: 62.5, active: false, current: false, link: "" },
      { x: 80, y: 66, active: false, current: false, link: "" },
      { x: 88, y: 44, active: false, current: false, link: "" },
      { x: 64, y: 39, active: false, current: false, link: "" },
      { x: 40, y: 33, active: false, current: false, link: "" },
      { x: 18, y: 13.5, active: false, current: false, link: "" },
    ],
  },
  reducers: {
    setMapLevels: (state, action) => {
      //console.log(action.payload.index)
      state.coordinates.forEach((c, i) => {
        c.active = i <= action.payload.index;
        c.current = i === action.payload.index;
        c.link = "https://scratch-gui.netlify.app/?" + i + "?" + action.payload.email;
      });
    },
  },
});

export const { setMapLevels } = mapState.actions;

export default mapState.reducer;
