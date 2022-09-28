import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Failed from "../components/Submition/Failed";

const SubmitResults = () => {
  const navigate = useNavigate();
  const notPassed = useSelector((state) => state.requestsState.notPassed);

  const closeInformationView = () => {
    navigate("/panel-nauczyciela");
  };

  useEffect(() => {
    // TODO: This page shoudn't be available unless after submition.
  }, []);

  return (
    <div
      className="ui raised very padded text container segment"
      style={{
        flexDirection: "column",
        minWidth: "80%",
        minHeight: "80%",
      }}
      id="default"
    >
      <div
        onClick={() => closeInformationView()}
        style={{ marginLeft: "auto", marginRight: 0 }}
        key="close button"
      >
        <i className="grey large close icon"></i>
      </div>
      {typeof notPassed === "undefined" || notPassed.length === 0 ? (
        <h5 style={{ textAlign: "center" }}>
          Wszystkie zmiany przeszły pomyślnie.
        </h5>
      ) : (
        <>
          <h5 style={{ textAlign: "center" }}>
            Nie wszystkie zmiany przeszły pomyślnie.
          </h5>
          <div
            className="ui middle aligned selection list"
            style={{ overflow: "auto", maxHeight: "400px" }}
            key="list"
          >
            {notPassed.map((fail, index) => {
              return <Failed key={index} failed={fail} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SubmitResults;
