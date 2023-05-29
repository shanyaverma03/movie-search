import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer_basic}>
      <ul className={classes.list}>
        <li>Home</li>
        <li>Services</li>
        <li>About</li>
        <li>Terms</li>
        <li>Privacy Policy</li>
        <p className={classes.copyright}>Company Name © 2018</p>
      </ul>
    </footer>
  );
};

export default Footer;
