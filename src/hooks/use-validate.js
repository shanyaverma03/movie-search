import { useState } from "react";

const useValidate = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueWasTouched, setValueWasTouched] = useState(false);

  const format = /\S+@\S+\.\S+/;
  const valueIsValid = validateInput(enteredValue, format);
  const valueIsInvalid = !valueIsValid && valueWasTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const valueBlurHandler = (event) => {
    setValueWasTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setValueWasTouched(false);
  };

  return {
    enteredValue,
    valueIsValid,
    valueIsInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useValidate;
