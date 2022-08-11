import Profile from "../components/profile/Profile";
import Profiles from "../components/profiles/Profiles";

const profileRoutes = {
  path: "/profiles",
  children: [
    { path: "", element: <Profiles /> },
    { path: "profile/:id", element: <Profile /> },
  ],
};

export default profileRoutes;
