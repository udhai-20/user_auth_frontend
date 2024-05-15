import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Login } from "../Pages/Login/Login";
import { Register } from "../Pages/Register/Register";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "../Pages/Profile/Profile";

export const MainRoutes = () => {
  const availableRoutes = [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile/:id",
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <div>Page Not Found</div>,
    },
  ];
  return (
    <>
      <Routes>
        {availableRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};
