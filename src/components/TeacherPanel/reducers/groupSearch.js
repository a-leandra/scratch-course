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
  },
});

export const { setKeyAndFilter, setGroups, sort, addGroup } =
  groupSearchSlice.actions;

export default groupSearchSlice.reducer;
