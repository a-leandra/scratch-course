import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import ReadyRoundIcon from "@rsuite/icons/ReadyRound";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import { removeRequest } from "../../reducers/requests";
import { submitRequests } from "../../actions/teacherPanelReq";
import { clearNotPassed } from "../../reducers/requests";

const ToBeSubmitted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((state) => state.requestsState.requests);

  const handleOnClick = async (e) => {
    dispatch(submitRequests(requests));
    navigate("/zapis");
  };

  useEffect(() => {
    dispatch(clearNotPassed());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "auto",
      }}
    >
      <Dropdown
        text="Zmiany"
        disabled={typeof requests === "undefined" || requests.length === 0}
      >
        {typeof requests === "undefined" ? (
          <></>
        ) : (
          <Dropdown.Menu>
            <Dropdown.Item
              text=" Zapisz"
              onClick={() => handleOnClick()}
              icon={<CheckRoundIcon style={{ color: "green" }} />}
            />
            {requests.map((request, index) => {
              return (
                <Dropdown.Item
                  text={request.info}
                  icon={<ReadyRoundIcon style={request.color} />}
                  onClick={() => dispatch(removeRequest(index))}
                  key={index}
                />
              );
            })}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export default ToBeSubmitted;
