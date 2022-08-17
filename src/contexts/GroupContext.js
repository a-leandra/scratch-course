import React, { createContext, useEffect, useState } from "react";
import groups from "../data/groups.json";
const axios = require("axios");

export const GroupContext = createContext();

const GroupContextProvider = ({ children }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [chosenGroup, setChosenGroup] = useState({ name: "", code: -1 });
  const [reverseSort, setReverseSort] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/panel-nauczyciela/groups/teacher"
      );
      setAllGroups(response.data);
    };

    fetchData();
  }, []);

  const chooseGroup = (group) => {
    setChosenGroup(group);
  };

  const addGroup = (name) => {
    if (canAddNewGroup(name)) {
      let group = {
        name: name.toUpperCase(),
        code: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      };
      setAllGroups([...allGroups, group]);
    }
  };

  const sortGroups = () => {
    let sortedGroups = allGroups.sort((a, b) => a.name.localeCompare(b.name));
    setAllGroups(reverseSort ? sortedGroups.reverse() : sortedGroups);
    setReverseSort(!reverseSort);
  };

  const canAddNewGroup = (name) => {
    if (
      name.length > 0 &&
      !allGroups.map((group) => group.name).includes(name)
    ) {
      return true;
    }
    return false;
  };

  return (
    <GroupContext.Provider
      value={{
        allGroups,
        chosenGroup,
        chooseGroup,
        addGroup,
        sortGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextProvider;
