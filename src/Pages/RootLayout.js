import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import classes from "./RootLayout.module.css";
const RootLayout = () => {
  return (
    <div className={classes.rootLayout}>
      <MainNavigation />

      <main className={classes.wrapper}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
