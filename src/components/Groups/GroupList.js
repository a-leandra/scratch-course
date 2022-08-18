import React, { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../contexts/GroupContext";
import { StudentContext } from "../../contexts/StudentContext";
import AddNewGroup from "./AddNewGroup";
import SearchBar from "../Layouts/SearchBar";
import Group from "./Group";

const GroupList = () => {
  const { allGroups, chosenGroup, chooseGroup, addGroup, sortGroups } =
    useContext(GroupContext);
  const { updateGroupData } = useContext(StudentContext);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    updateGroupData(chosenGroup);
  }, []);

  const handleUserChoice = (e, param) => {
    chooseGroup(param);
    updateGroupData(param._id);
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
      <AddNewGroup add={addGroup} />
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
              handleClick={handleUserChoice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupList;
