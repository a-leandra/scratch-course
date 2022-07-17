import React, { createContext, useEffect, useState } from "react";

export const GroupListContext = createContext();

const GroupListContextProvider = ({ children }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [chosenGroup, setChosenGroup] = useState({ name: "", code: -1 });
  const [reverseSort, setReverseSort] = useState(true);

  useEffect(() => {
    let groups = [
      { name: "A", code: 123 },
      { name: "B", code: 987 },
    ];
    setAllGroups(groups);
  }, []);

  const chooseGroup = (group) => {
    setChosenGroup(group);
  };

  const addGroup = (group) => {
    if (!allGroups.map((group) => group.name).includes(group.name)) {
      setAllGroups([...allGroups, group]);
    }
  };

  const sortGroups = () => {
    let sortedGroups = allGroups.sort((a, b) => a.name.localeCompare(b.name));
    setAllGroups(reverseSort ? sortedGroups.reverse() : sortedGroups);
    setReverseSort(!reverseSort);
  };

  return (
    <GroupListContext.Provider
      value={{ allGroups, chosenGroup, chooseGroup, addGroup, sortGroups }}
    >
      {children}
    </GroupListContext.Provider>
  );
};

export default GroupListContextProvider;
