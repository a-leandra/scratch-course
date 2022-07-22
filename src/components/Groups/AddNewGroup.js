import React, { useState } from "react";

const AddNewGroup = ({ add }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    add(name);
    setName("");
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
          value={name}
          id="group"
          onChange={(e) => setName(e.target.value)}
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
