import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewGroup from "./AddNewGroup";
import SearchBar from "../Layouts/SearchBar";
import Group from "./Group";
const axios = require("axios");
const {
  setKeyAndFilter,
  setGroups,
  sort,
} = require("../../reducers/groupSearch");
const {
  setStudentGroupAndPrepareData,
} = require("../../reducers/studentSearch");

const GroupList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groupSearch.filtered);
  const keyword = useSelector((state) => state.groupSearch.searchKey);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/groups/wojska@gmail.com"
      );
      dispatch(setGroups(response.data));
    };
    fetchData();
  }, []);

  const handleUserChoice = (e, group) => {
    dispatch(setStudentGroupAndPrepareData(group.code));
  };

  return (
    <div
      className="ui container center aligned"
      style={{ marginTop: "1em", flex: 1 }}
    >
      <AddNewGroup />
      <SearchBar
        keyword={keyword}
        setKeyword={(keyword) => {
          dispatch(setKeyAndFilter(keyword));
        }}
        sort={() => {
          dispatch(sort());
        }}
      />
      <div
        className="ui middle aligned selection list"
        style={{ overflow: "auto", maxHeight: "400px" }}
      >
        {groups.map((group) => {
          return (
            <Group
              key={group.name}
              group={group}
              handleClick={handleUserChoice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupList;
