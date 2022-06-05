import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { authorizedRoutes } from "./routes/authorized";

function App() {
  const routes = useRoutes(authorizedRoutes);
  const { pathname } = useLocation();

  return (
    <div className="App">
      <Navbar />
      {pathname === "/" ? (
        routes
      ) : (
        <section className="container">{routes}</section>
      )}
    </div>
  );
}

export default App;
