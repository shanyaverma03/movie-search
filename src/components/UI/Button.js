import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.message}
    </button>
  );
};

export default Button;
