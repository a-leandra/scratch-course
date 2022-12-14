import React, { useEffect } from "react";
import field from "../../static/assets/field.png";
import fieldCurrent from "../../static/assets/fieldCurrent.png";
//import activeM from "../../static/assets/activeM.png";
//import currentM from "../../static/assets/currentM.png";
//import fieldM from "../../static/assets/fieldM.png";
import fieldActive from "../../static/assets/fieldActive.png";
import { useDispatch, useSelector } from "react-redux";
import "./map_style.css";
import { /*fetchLastTask,*/ fetchHomework } from "../../actions/req";
const { setMapLevels, setHomework } = require("../../reducers/mapState");

export default function MapFields() {
  const fields = [];

  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.mapState.coordinates);
  //const homework = useSelector((state) => state.mapState.homework);

  useEffect(() => {
    dispatch(fetchHomework(setHomework));
    //dispatch(fetchLastTask(setMapLevels));
  }, [setMapLevels/*, setHomework*/]);

  coordinates.forEach((element, index) => {
    if (element.current) {
      fields.push(
        <a href={element.link}>
          <img
            src={fieldCurrent}//{index !== homework ? fieldCurrent : currentM}
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
            src={fieldActive}//{index !== homework ? fieldActive: activeM}
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
      //console.log(index);
      //console.log(homework);
      fields.push(
        <a href={element.link}>
          <img
            src={field}//{index !== homework ? field : fieldM}
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
