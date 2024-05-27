import React from "react";
import Button from "../Buttons/Button";
import styles from "./Card.module.css";
const Card = ({ title, balance, handleClick, buttonText, buttonType }) => {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {title}:
          <span
            className={
              buttonType === "success" ? styles.success : styles.failure
            }
          >
            ₹{balance}
          </span>
        </h2>

        <Button handleClick={handleClick} buttonType={buttonType}>
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default Card;
