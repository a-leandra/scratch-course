import { createSlice } from "@reduxjs/toolkit";

const filter = (groups, keyword) => {
  const filtered = [];
  for (const group of groups) {
    if (
      group.name.toLocaleLowerCase().startsWith(keyword.toLocaleLowerCase())
    ) {
      filtered.push(group);
    }
  }
  return filtered;
};

const groupSearchSlice = createSlice({
  name: "groupSearch",
  initialState: {
    groups: [],
    filtered: [],
    keyword: "",
    reverseSort: false,
  },
  reducers: {
    setKeyAndFilter(state, action) {
      state.keyword = action.payload;
      state.filtered = filter(state.groups, state.keyword);
    },
    setGroups(state, action) {
      state.groups = action.payload;
      state.filtered = action.payload;
    },
    sort(state) {
      let sortedGroups = state.filtered.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      state.filtered = state.reverseSort
        ? sortedGroups.reverse()
        : sortedGroups;
      state.reverseSort = !state.reverseSort;
    },
    addGroup(state, action) {
      state.groups.push(action.payload);
      state.filtered.push(action.payload);
    },
    removeGroup(state, action) {
      state.groups = state.groups.filter((group) => {
        return group.code !== action.payload;
      });
      state.filtered = state.filtered.filter((group) => {
        return group.code !== action.payload;
      });
    },
    changeHomeworkOfGroup(state, action) {
      let i = state.groups.findIndex(
        (group) => group.code === action.payload.code
      );
      state.groups[i].homework = { number: action.payload.homework };
      let j = state.filtered.findIndex(
        (group) => group.code === action.payload.code
      );
      state.filtered[j].homework = { number: action.payload.homework };
    },
  },
});

export const {
  setKeyAndFilter,
  setGroups,
  sort,
  addGroup,
  removeGroup,
  changeHomeworkOfGroup,
} = groupSearchSlice.actions;

export default groupSearchSlice.reducer;
