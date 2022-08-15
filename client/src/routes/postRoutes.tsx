import Posts from "../components/posts/Posts";

const postRoutes = {
  path: "/",
  children: [{ path: "posts", element: <Posts /> }],
};

export default postRoutes;
