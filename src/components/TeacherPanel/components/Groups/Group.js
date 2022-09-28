import React from "react";
import { useDispatch } from "react-redux";
import { addRequest } from "../../reducers/requests";
import { REMOVE_GROUP } from "../../static/constants/teacherPanelConst";

const Group = ({ group, handleClick }) => {
  const dispatch = useDispatch();

  const removeGroupWrapper = async (e, group) => {
    const submit = {
      type: REMOVE_GROUP,
      param: group.code,
      info: " Usuń grupę " + group.name,
      color: { color: "red" },
    };
    dispatch(addRequest(submit));
  };

  return (
    <div
      className="item"
      style={{ overflow: "auto", maxHeight: "100px", minHeight: "50px" }}
      onClick={(event) => handleClick(event, group)}
    >
      <div
        className="content"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        <div className="header">{group.name}</div>
        <div>#{group.code}</div>
        <div onClick={(event) => removeGroupWrapper(event, group)}>
          <i className="close icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Group;
