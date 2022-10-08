import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_GROUP } from "../../static/constants/teacherPanelConst";
import { tryToMakeRequest } from "../../actions/teacherPanelReq";

const Group = ({ group, handleClick }) => {
  const dispatch = useDispatch();

  const removeGroupWrapper = async (e, group) => {
    await tryToMakeRequest(
      {
        type: REMOVE_GROUP,
        param: group.code,
      },
      dispatch
    );
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
