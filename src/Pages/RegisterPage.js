import Register from "../components/Auth/Register";
import Footer from "../components/Footer";
import classes from "./RegisterLoginPage.module.css";

const RegisterPage = () => {
  return (
    <>
      <div className={classes.wrapper}>
        <Register />
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
