import { Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Landing from "../components/layout/Landing";

export const publicRoutes = [
  {
    path: "",
    children: [
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Navigate replace to='/' /> },
    ],
  },
];
