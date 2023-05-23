import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import MyListPage from "./Pages/MyListPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import BrowsePage from "./Pages/BrowsePage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import LearnMorePage from "./Pages/LearnMorePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "mylist",
        element: <MyListPage />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "browse",
        children: [
          {
            index: true,
            element: <BrowsePage />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <MovieDetailPage />,
              },
              {
                path: "learnmore",
                element: <LearnMorePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
