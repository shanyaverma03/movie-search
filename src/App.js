import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";

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
        path: "favourites",
        element: <Favourites />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
