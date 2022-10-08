import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_HOMEWORK } from "../../static/constants/teacherPanelConst";
import { tryToMakeRequest } from "../../actions/teacherPanelReq";

const Homework = () => {
  const group = useSelector((state) => state.studentSearch.studentGroup);
  const dispatch = useDispatch();

  const onClick = async (e, i) => {
    await tryToMakeRequest(
      {
        type: CHANGE_HOMEWORK,
        param: { code: group.code, homework: i },
      },
      dispatch
    );
  };

  return (
    // TODO: Change to range or something else.
    Object.getOwnPropertyNames(group).length !== 0 ? (
      <div
        className="ui form"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="inline fields">
          <label>Praca domowa:</label>
          {[...Array.from({ length: 10 }, (_, i) => i + 1)].map((j, _) => (
            <div className="field" key={j}>
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  onChange={(event) => onClick(event, j)}
                  checked={
                    typeof group.homework !== "undefined" &&
                    group.homework !== null &&
                    typeof group.homework.number !== "undefined" &&
                    group.homework.number === j
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
