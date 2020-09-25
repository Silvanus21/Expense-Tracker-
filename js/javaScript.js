// document.addEventListener("DOMContentLoaded", () => {
  const balance = document.querySelector("#balance .rate");
  const plus = document.querySelector("#money-plus .rate");
  const minus = document.querySelector("#money-minus .rate");
  const list = document.querySelector("#list");
  const form = document.querySelector("#form");
  const amount = document.querySelector("#amount");
  const text = document.querySelector("#text");
//   const Swal = require("sweetalert2");

  const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
  );

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  let transactions =
    localStorage.getItem("transactions") !== null
      ? localStorageTransactions
      : [];

  // add new transaction
  function addTransaction(event) {
    event.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "Please enter both text and amount.",
      });
    } else {
      const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
      };

      transactions.push(transaction);

      addTransactionDOM(transaction);

      update();

      updateLocalStorage();

      text.value = "";
      amount.value = "";
    }
  }

  //generate random id number
  function generateID() {
    return Math.floor(Math.random() * 10000000);
  }

  // add transactions to dom list
  function addTransactionDOM(transaction) {
    // get sign
    const sign1 = transaction.amount < 0 ? "minus" : "plus";
    const sign2 = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // add class of minus or plus
    item.classList.add(sign1);

    item.innerHTML = `
    ${transaction.text} <span>${sign2}${Math.abs(
      transaction.amount
    )}</span> <button class="del-btn" onclick= "removeTrans(${
      transaction.id
    })">x</button>  
      `;
    list.appendChild(item);
  }

  // update balance, income and expense
  function update() {
    const amounts = transactions.map((tran) => tran.amount);

    balance_amount = amounts
      .reduce((accumulator, item) => (accumulator += item), 0)
      .toFixed(2);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);

    const expense = (parseInt(income) - parseInt(balance_amount)).toFixed(2);

    // colouring balance amount
    if (parseInt(balance_amount) < 0) {
      document.querySelector("#balance").classList.add("balance-color");
    } else {
      document.querySelector("#balance").classList.remove("balance-color");
    }

    if (list.innerHTML === "") {
      document.querySelector(".history").classList.add("history-remove");
    } else {
      document.querySelector(".history").classList.remove("history-remove");
    }

    balance.innerText = `${balance_amount}`;
    plus.innerText = `${income}`;
    minus.innerText = `${expense}`;
  }

  // remove transaction form history
  function removeTrans(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    updateLocalStorage();

    init();
  }

  //update localstorage transactions
  function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  // init function
  function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    update();
  }

  init();

  form.addEventListener("submit", addTransaction);
// });
