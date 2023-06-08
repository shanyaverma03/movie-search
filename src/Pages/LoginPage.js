import Login from "../components/Auth/Login";
import classes from "./RegisterLoginPage.module.css";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <>
      <div className={classes.wrapper}>
        <Login />
      </div>
      <Footer />{" "}
    </>
  );
};

export default LoginPage;
