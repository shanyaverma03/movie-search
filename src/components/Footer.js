import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <body>
      <div className={classes.footer_basic}>
        <footer>
          <div class="social">
            <a href="#">
              <i class="icon ion-social-instagram"></i>
            </a>
            <a href="#">
              <i class="icon ion-social-snapchat"></i>
            </a>
            <a href="#">
              <i class="icon ion-social-twitter"></i>
            </a>
            <a href="#">
              <i class="icon ion-social-facebook"></i>
            </a>
          </div>
          <ul class="list-inline">
            <li class="list-inline-item">Home</li>
            <li class="list-inline-item">Services</li>
            <li class="list-inline-item">About</li>
            <li class="list-inline-item">Terms</li>
            <li class="list-inline-item">Privacy Policy</li>
          </ul>
          <p className={classes.copyright}>Company Name © 2018</p>
        </footer>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </body>
  );
};

export default Footer;
