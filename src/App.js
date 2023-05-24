import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import MyListPage from "./Pages/MyListPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import BrowsePage from "./Pages/BrowsePage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import LearnMorePage from "./Pages/LearnMorePage";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { useDispatch } from "react-redux";
import { isAuthenticatedActions } from "./store/index";
import { onAuthStateChanged } from "firebase/auth";

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
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        console.log("user found " + user.uid);
        dispatch(isAuthenticatedActions.userFound(uid));
      } else {
        console.log("user not found");
        console.log(user);
        dispatch(isAuthenticatedActions.userNotFound());

        console.log(user);
      }
    });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
