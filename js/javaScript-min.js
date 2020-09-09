const balance=document.querySelector("#balance .rate"),plus=document.querySelector("#money-plus .rate"),minus=document.querySelector("#money-minus .rate"),list=document.querySelector("#list"),form=document.querySelector("#form"),amount=document.querySelector("#amount"),text=document.querySelector("#text"),localStorageTransactions=JSON.parse(localStorage.getItem("transactions"));let transactions=null!==localStorage.getItem("transactions")?localStorageTransactions:[];function addTransaction(t){if(t.preventDefault(),""===text.value.trim||""===amount.value.trim)alert("please add text and amount");else{const t={id:generateID(),text:text.value,amount:+amount.value};transactions.push(t),addTransactionDOM(t),update(),updateLocalStorage(),text.value="",amount.value=""}}function generateID(){return Math.floor(1e7*Math.random())}function addTransactionDOM(t){const e=t.amount<0?"minus":"plus",a=t.amount<0?"-":"+",n=document.createElement("li");n.classList.add(e),n.innerHTML=`\n    ${t.text} <span>${a}${Math.abs(t.amount)}</span> <button class="del-btn" onclick= "removeTrans(${t.id})">x</button>  \n      `,list.appendChild(n)}function update(){const t=transactions.map(t=>t.amount);balance_amount=t.reduce((t,e)=>t+=e,0).toFixed(2);const e=t.filter(t=>t>0).reduce((t,e)=>t+=e,0).toFixed(2),a=(parseInt(e)-parseInt(balance_amount)).toFixed(2);parseInt(balance_amount)<0?document.querySelector("#balance").classList.add("balance-color"):document.querySelector("#balance").classList.remove("balance-color"),""===list.innerHTML?document.querySelector(".history").classList.add("history-remove"):document.querySelector(".history").classList.remove("history-remove"),balance.innerText=""+balance_amount,plus.innerText=""+e,minus.innerText=""+a}function removeTrans(t){transactions=transactions.filter(e=>e.id!==t),updateLocalStorage(),init()}function updateLocalStorage(){localStorage.setItem("transactions",JSON.stringify(transactions))}function init(){list.innerHTML="",transactions.forEach(addTransactionDOM),update()}init(),form.addEventListener("submit",addTransaction);