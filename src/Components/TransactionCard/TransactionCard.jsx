import React from "react";
import { PiPizza, PiGift } from "react-icons/pi";
import styles from "./TransactionCard.module.css";
import { BsSuitcase2 } from "react-icons/bs";
import Button from "../Buttons/Button";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

const TransactionCard = ({ details, handleDelete, handleEdit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.innerCard}>
        <div className={styles.cardIcon}>
          {details.category === "food" && <PiPizza />}
          {details.category === "entertainment" && <PiGift />}
          {details.category === "travel" && <BsSuitcase2 />}
        </div>
        <div className={styles.cardInfo}>
          <h3>{details.title}</h3>
          <p>{details.date}</p>
        </div>
      </div>
      <div className={styles.innerCard}>
        <p className={styles.primary}>₹{details.price}</p>
        <Button buttonType="failure" handleClick={handleEdit}>
          <MdOutlineModeEdit />
        </Button>
        <Button buttonType="primary" handleClick={handleDelete}>
          <IoMdCloseCircleOutline />
        </Button>
      </div>
    </div>
  );
};

export default TransactionCard;
