import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHomework } from "../../actions/teacherPanelReq";
const {
  changeHomeworkTo,
} = require("../../reducers/teacherPanel/studentSearch");

const Homework = () => {
  const group = useSelector((state) => state.studentSearch.studentGroup);
  const dispatch = useDispatch();

  const onClick = async (e, i) => {
    changeHomework(group.code, i);
    dispatch(changeHomeworkTo(i));
    window.location.reload(false); // TODO: resolve remembering change without forced update
  };

  return (
    // TODO: Change to range.
    Object.getOwnPropertyNames(group).length !== 0 ? (
      <div class="ui form">
        <div class="inline fields">
          <label>Praca domowa:</label>
          {[...Array.from({ length: 10 }, (_, i) => i + 1)].map((j, _) => (
            <div class="field">
              <div class="ui radio checkbox">
                <input
                  type="radio"
                  key={j}
                  onClick={(event) => onClick(event, j)}
                  checked={
                    group.homework !== null && group.homework.number === j
                      ? "checked"
                      : ""
                  }
                />
                <label>{j}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <></>
    )
  );
};

export default Homework;
