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
      </ul>
      <p className={classes.copyright}>Movie Search © 2023</p>
    </footer>
  );
};

export default Footer;
