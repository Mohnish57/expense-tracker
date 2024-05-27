import React, { useState } from "react";
import Button from "../Buttons/Button";
import styles from "./Form.module.css";
import { useSnackbar } from "notistack";

const AddBalanceForm = ({ setIsOpen, setBalance }) => {
  const [income, setIncome] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income > 0) {
      setBalance((prev) => prev + Number(income));
      enqueueSnackbar(`${income} added to the wallet balance`, {
        variant: "success",
      });
      setIsOpen(false);
    } else {
      enqueueSnackbar("Income should be more then 0", { variant: "warning" });
      setIsOpen(false);
      return;
    }
  };
  return (
    <>
      <div>
        <h1 className={styles.title}>Add Income</h1>
        <form className={styles.balanceForm} onSubmit={handleSubmit}>
          <label htmlFor="income">
            <input
              type="number"
              name="income"
              onChange={(e) => setIncome(e.target.value)}
              value={income}
              placeholder="Income Amount"
              required
            />
          </label>

          <Button type="submit" buttonType="primary" shadow>
            Add Balance
          </Button>
          <Button
            shadow
            buttonType="secondary"
            handleClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddBalanceForm;
