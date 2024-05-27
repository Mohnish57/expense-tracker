import React, { useEffect, useState } from "react";
import Card from "../Components/Cards/Card";
import styles from "./Home.module.css";
import PieChartComponent from "../Components/Charts/PieChartComponent";
import BarChartComponent from "../Components/Charts/BarChartComponent";
import ExpenseForm from "../Components/Forms/ExpenseForm";
import AddBalanceForm from "../Components/Forms/AddBalanceForm";
import ModalWrapper from "../Components/Modal/Modal";
import { useSnackbar } from "notistack";
import TransactionList from "../Components/TransactionsList/TransactionList";

const Home = () => {
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [data, setData] = useState([]);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    enqueueSnackbar("Hey Welcome to Expense Tracker App", {
      variant: "success",
    });

    const localBalance = localStorage.getItem("balance");
    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }
    const items = JSON.parse(localStorage.getItem("expenses"));

    setExpenseList(items || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    } else {
      setExpense(0);
    }

    let obj = {};
    expenseList.forEach((item) => {
      if (obj[item.category]) {
        obj[item.category].price = (
          parseInt(obj[item.category].price) + parseInt(item.price)
        ).toString();
      } else {
        obj[item.category] = {
          name: item.category,
          price: Number(item.price),
        };
      }
    });
    // console.log(obj);

    setData((prev) => [...Object.values(obj)]);
  }, [expenseList]);

  // console.log(isOpenExpense);
  console.log(data);
  return (
    <>
      <div className={styles.section}>
        <h1 className={styles.title}>Expense Tracker</h1>
        <div className={styles.firstSection}>
          <Card
            type="income"
            balance={balance}
            buttonText="+ Add Income"
            buttonType="success"
            handleClick={() => setIsOpenBalance(true)}
            title="Wallet Balance"
          />
          <Card
            type="expense"
            balance={expense}
            buttonText="+ Add Expense"
            buttonType="failure"
            handleClick={() => setIsOpenExpense(true)}
            title="Expenses"
          />
          <PieChartComponent data={data} />
        </div>
      </div>

      <div className={styles.secondSection}>
        <div className={styles.innerSection}>
          <h1 className={styles.title}>Recent Transactions</h1>
          <div className={styles.childSection}>
            <TransactionList
              expenseList={expenseList}
              balance={balance}
              setBalance={setBalance}
              setExpenseList={setExpenseList}
            />
          </div>
        </div>

        <div className={styles.innerSection}>
          <h1 className={styles.title}>Top Expenses</h1>
          <div className={styles.childSection}>
            <BarChartComponent data={data} />
          </div>
        </div>

        <ModalWrapper isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
          <ExpenseForm
            setIsOpen={setIsOpenExpense}
            setExpense={setExpense}
            balance={balance}
            setBalance={setBalance}
            expenseList={expenseList}
            setExpenseList={setExpenseList}
          />
        </ModalWrapper>

        <ModalWrapper isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
          <AddBalanceForm
            setIsOpen={setIsOpenBalance}
            setBalance={setBalance}
          />
        </ModalWrapper>
      </div>
    </>
  );
};

export default Home;
