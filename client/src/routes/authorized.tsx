import { Navigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import CreateProfile from "../components/profile-forms/CreateProfile";

export const authorizedRoutes = [
  {
    path: "",
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/", element: <Navigate replace to="/dashboard" /> },
      { path: "/create-profile", element: <CreateProfile /> },
      { path: "*", element: <Navigate replace to="/" /> },
    ],
  },
];
