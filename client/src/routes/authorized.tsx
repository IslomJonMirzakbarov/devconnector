import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export const authorizedRoutes = [
  {
    path: "",
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/", element: <Navigate replace to='/dashboard' /> },
      { path: "*", element: <Navigate replace to='/' /> },
    ],
  },
];
