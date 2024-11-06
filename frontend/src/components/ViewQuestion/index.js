import React from "react";
import Sidebar from "../dbmsflow/Sidebar";
import "./index.css";
import MainQuestion from "./MainQuestion";

function Index() {
  return (
    <div className="dbms-index">
      <div className="dbms-index-content">
        <Sidebar />
        <MainQuestion />
      </div>
    </div>
  );
}

export default Index;