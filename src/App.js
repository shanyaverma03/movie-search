import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import MyListPage from "./Pages/MyListPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import BrowsePage from "./Pages/BrowsePage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { useDispatch } from "react-redux";
import { isAuthenticatedActions } from "./store/index";
import { onAuthStateChanged } from "firebase/auth";
import { getMovieListAction } from "./store/myListSlice";
import PhotosPage from "./Pages/PhotosPage";
import GenreDetailPage from "./Pages/GenreDetailPage";

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
                path: "photos",
                element: <PhotosPage />,
              },
            ],
          },
          {
            path: "genres/:genre",
            children: [
              {
                index: true,
                element: <GenreDetailPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    children: [
      {
        index: true,
        element: <RegisterPage />,
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
        dispatch(isAuthenticatedActions.userFound(uid));
        dispatch(getMovieListAction(uid));
      } else {
        dispatch(isAuthenticatedActions.userNotFound());
      }
    });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
