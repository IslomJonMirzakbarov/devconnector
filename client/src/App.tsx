import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { authorizedRoutes } from "./routes/authorized";

// create a client
const queryClient = new QueryClient();

function App() {
  const routes = useRoutes(authorizedRoutes);
  const { pathname } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
        {pathname === "/" ? (
          routes
        ) : (
          <section className="container">{routes}</section>
        )}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
