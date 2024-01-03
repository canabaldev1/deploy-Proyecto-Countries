import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Error404 from "./Views/Error404/Error404";
import Detail from "./Views/Detail/Detail";
import CreateActivities from "./Views/CreateActivities/CreateActivities";
import DisplayActivities from "./Views/DisplayActivities/DisplayActivities";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<DisplayActivities />} />
        <Route path="/activity/create" element={<CreateActivities />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
