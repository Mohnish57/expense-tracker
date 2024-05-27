import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "../Buttons/Button";
import { useSnackbar } from "notistack";

const ExpenseForm = ({
  setIsOpen,
  setExpense,
  balance,
  setBalance,
  expenseList,
  setExpenseList,
  editId,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    date: "",
  });

  useEffect(() => {
    if (editId) {
      const expenseData = expenseList.find((item) => item.id === editId);
      setForm({
        title: expenseData.title,
        price: expenseData.price,
        category: expenseData.category,
        date: expenseData.date,
      });
    }
  }, [editId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.price > 0 && balance > form.price) {
      setExpense((prev) => prev + Number(form.price));
      setBalance((prev) => prev - Number(form.price));
      const lastId = expenseList.length > 0 ? expenseList[0].id : 0;

      setExpenseList((prev) => [...prev, { ...form, id: lastId + 1 }]);
      setIsOpen(false);
    } else if (balance < form.price) {
      enqueueSnackbar("Price should be less than the wallet balance", {
        variant: "warning",
      });
      setIsOpen(false);
    } else {
      enqueueSnackbar("Price should be greater then 0", {
        variant: "warning",
      });
      setIsOpen(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // console.log(expenseList);

  const handleEdit = (e) => {
    e.preventDefault();
    const updated = expenseList.map((item) => {
      if (item.id === editId) {
        const priceDifference = Number(item.price) - Number(form.price);
        // console.log(Math.abs(priceDifference));
        if (Math.abs(priceDifference) > balance) {
          enqueueSnackbar("Price should not exceed the wallet balance", {
            variant: "warning",
          });
          setIsOpen(false);
        }
        setBalance((prev) => prev + priceDifference);
        return { ...form, id: editId };
      } else {
        return item;
      }
    });
    setExpenseList(updated);
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>
          {editId ? "Edit Expense" : "Add Expense"}
        </h1>
        <form
          className={styles.incomeForm}
          onSubmit={editId ? handleEdit : handleSubmit}
        >
          <label htmlFor="title">
            <input
              type="text"
              value={form.title}
              placeholder="Title"
              name="title"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="price">
            <input
              type="number"
              value={form.price}
              placeholder="Price"
              name="price"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="category">
            <select
              value={form.category}
              name="category"
              required
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </label>
          <label htmlFor="date">
            <input
              name="date"
              value={form.date}
              type="date"
              required
              onChange={handleChange}
            />
          </label>
          <Button type="submit" shadow buttonType="primary">
            {editId ? "Edit Expense" : "Add Expense"}
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

export default ExpenseForm;
