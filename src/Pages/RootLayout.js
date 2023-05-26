import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
const RootLayout = () => {
  return (
    <div className="rootLayout">
      <MainNavigation />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
