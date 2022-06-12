import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { authorizedRoutes } from "./routes/authorized";
import { loadUser, setAuthError } from "./store/slices/AuthSlice";
import { RootState } from "./store/store";
import { setAuthToken } from "./utils/utils";

function App() {
  const routes = useRoutes(authorizedRoutes);
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const { token } = useAppSelector((store: RootState) => store.auth.value);
  if (token) {
    setAuthToken(token);
  }

  useQuery("auth-user", async () => {
    if (token) {
      setAuthToken(token);
    }

    try {
      const response = await axios.get("/api/auth");
      dispatch(loadUser(response.data));
    } catch (err: any) {
      dispatch(setAuthError());
    }
  });

  return (
    <>
      <div className="App">
        <Navbar />
        {pathname === "/" ? (
          routes
        ) : (
          <section className="container">
            <Alert />
            {routes}
          </section>
        )}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
