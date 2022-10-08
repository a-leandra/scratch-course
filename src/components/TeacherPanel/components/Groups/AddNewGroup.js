import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { ADD_GROUP } from "../../static/constants/teacherPanelConst";
import { tryToMakeRequest } from "../../actions/teacherPanelReq";

const AddNewGroup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await tryToMakeRequest(
      {
        type: ADD_GROUP,
        param: name,
      },
      dispatch
    );
    setName("");
  };

  return (
    <Form
      className="ui form"
      onSubmit={handleSubmit}
      style={{ minHeight: "50px" }}
    >
      <div
        className="form-inner"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        <div className="form-group">
          <Form.Label htmlFor="group">Nazwa grupy: </Form.Label>
          <div className="form-input-div">
            <Form.Control
              type="text"
              value={name}
              id="group"
              onChange={(e) => setName(e.target.value)}
              placeholder="Wpisz nazwę nowej grupy..."
            />
            <Button
              type="submit"
              style={{
                paddingInline: "25px",
                marginInline: "15px",
              }}
            >
              Dodaj
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddNewGroup;
