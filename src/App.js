import React from "react";
import GroupList from "./components/Groups/GroupList";
import StudentList from "./components/Students/StudentList";
import GroupListContextProvider from "./contexts/GroupListContext";
import StudentListContextProvider from "./contexts/StudentListContext";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <div
        className="ui raised very padded text container segment"
        style={{ minWidth: "1200px", minHeight: "600px" }}
      >
        <div className="mainContainer">
          <StudentListContextProvider>
            <GroupListContextProvider>
              <GroupList />
              <StudentList />
            </GroupListContextProvider>
          </StudentListContextProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
