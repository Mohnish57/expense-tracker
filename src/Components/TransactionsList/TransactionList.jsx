import React, { useState } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import ModalWrapper from "../Modal/Modal";
import ExpenseForm from "../Forms/ExpenseForm";

const TransactionList = ({
  expenseList,
  setExpenseList,
  balance,
  setBalance,
}) => {
  const [editId, setEditId] = useState(0);
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);

  const handleDelete = (id) => {
    const item = expenseList.find((i) => i.id === id);
    const price = Number(item.price);
    setBalance((prev) => prev + price);
    setExpenseList(expenseList.filter((i) => i !== item));
  };
  const handleEdit = (id) => {
    setEditId(id);
    setIsDisplayEditor(true);
  };

  return (
    <>
      {expenseList.length > 0 ? (
        <ul>
          {expenseList.map((transaction, index) => {
            return (
              <TransactionCard
                key={transaction.id}
                details={transaction}
                handleDelete={() => handleDelete(transaction.id)}
                handleEdit={() => handleEdit(transaction.id)}
              />
            );
          })}
        </ul>
      ) : (
        <p>No Recent Transactions!</p>
      )}
      <ModalWrapper isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
        <ExpenseForm
          editId={editId}
          expenseList={expenseList}
          setIsOpen={setIsDisplayEditor}
          setExpense={setExpenseList}
          balance={balance}
          setBalance={setBalance}
          setExpenseList={setExpenseList}
        />
      </ModalWrapper>
    </>
  );
};

export default TransactionList;
