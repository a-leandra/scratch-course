import React, { useState } from "react";

const AddNewGroup = ({ addNewGroup }) => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.length > 0) {
      addNewGroup(groupName);
      setGroupName("");
    }
  };

  return (
    <form
      className="ui form"
      onSubmit={handleSubmit}
      style={{ minHeight: "50px" }}
    >
      <div
        className="field"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        <label htmlFor="group">Nazwa grupy: </label>
        <input
          type="text"
          value={groupName}
          id="group"
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Wpisz nazwę nowej grupy..."
        />
        <button className="ui button" type="submit">
          Dodaj
        </button>
      </div>
    </form>
  );
};

export default AddNewGroup;
