import React, { useContext, useEffect, useState } from "react";
import { GroupListContext } from "../../contexts/GroupListContext";
import { StudentListContext } from "../../contexts/StudentListContext";
import AddNewGroup from "./AddNewGroup";
import SearchBar from "../SearchBar";
import Group from "./Group";

const GroupList = () => {
  const { allGroups, chosenGroup, chooseGroup, addGroup, sortGroups } =
    useContext(GroupListContext);
  const { updateGroupData } = useContext(StudentListContext);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    updateGroupData(chosenGroup);
  }, []);

  const addNewGroup = (name) => {
    let group = {
      name: name.toUpperCase(),
      code: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    };
    addGroup(group);
  };

  const showGroupStudents = (e, param) => {
    chooseGroup(param);
    updateGroupData(param.code);
  };

  const filterByKeyword = (group) => {
    if (group.name.startsWith(keyword.toUpperCase())) {
      return true;
    }
    return false;
  };

  return (
    <div
      className="ui container center aligned"
      style={{ marginTop: "1em", flex: 1 }}
    >
      <AddNewGroup addNewGroup={addNewGroup} />
      <SearchBar keyword={keyword} setKeyword={setKeyword} sort={sortGroups} />
      <div
        className="ui middle aligned selection list"
        style={{ overflow: "auto", maxHeight: "400px" }}
      >
        {allGroups.filter(filterByKeyword).map((group) => {
          return (
            <Group
              key={group.name}
              group={group}
              handleClick={showGroupStudents}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupList;
