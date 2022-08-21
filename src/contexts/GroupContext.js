import { set } from "mongoose";
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
        "http://localhost:5000/groups/marekKafka"
      );
      setAllGroups(response.data);
    };

    fetchData();
  }, []);

  const chooseGroup = (group) => {
    setChosenGroup(group);
  };

  const sortGroups = () => {
    let sortedGroups = allGroups.sort((a, b) => a.name.localeCompare(b.name));
    setAllGroups(reverseSort ? sortedGroups.reverse() : sortedGroups);
    setReverseSort(!reverseSort);
  };

  return (
    <GroupContext.Provider
      value={{
        allGroups,
        chosenGroup,
        chooseGroup,
        sortGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextProvider;
