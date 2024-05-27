import React from "react";
import styles from "./Button.module.css";
const Button = ({
  children,
  handleClick,
  buttonType = "primary",
  shadow = "false",
  type = "button",
}) => {
  return (
    <>
      <button
        type={type}
        className={`${styles[buttonType]} ${styles[buttonType]} ${
          shadow && styles.shadow
        }`}
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
