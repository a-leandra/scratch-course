import React, { useEffect } from "react";
import field from "../../static/assets/field.png";
import fieldCurrent from "../../static/assets/fieldCurrent.png";
import fieldActive from "../../static/assets/fieldActive.png";
import { useDispatch, useSelector } from "react-redux";
import "./map_style.css";
import { fetchLastTask } from "../../actions/req";
const { setMapLevels } = require("../../reducers/mapState");

export default function MapFields() {
  const fields = [];

  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.mapState.coordinates);

  useEffect(() => {
    dispatch(fetchLastTask(setMapLevels));
  }, [setMapLevels]);

  coordinates.forEach((element) => {
    if (element.current) {
      fields.push(
        <a href="https://scratch-gui.netlify.app/?1">
          <img
            src={fieldCurrent}
            alt="field"
            className="field"
            style={{
              position: "absolute",
              left: element.x + "vw",
              top: element.y + "vh",
            }}
          />
        </a>
      );
    } else if (element.active) {
      fields.push(
        <a href={element.link}>
          <img
            src={fieldActive}
            alt="field"
            className="field"
            style={{
              position: "absolute",
              left: element.x + "vw",
              top: element.y + "vh",
            }}
          />
        </a>
      );
    } else {
      fields.push(
        <a href={element.link}>
          <img
            src={field}
            alt="field"
            className="field"
            style={{
              position: "absolute",
              left: element.x + "vw",
              top: element.y + "vh",
            }}
          />
        </a>
      );
    }
  });

  return fields;
}
