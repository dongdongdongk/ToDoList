const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
// console.log(list);
if(list) {
    list.forEach(work=>{
        toDoList(work);
    })
}

formEl.addEventListener("submit",(event)=>
{
    event.preventDefault()
    // console.log(inputEl.value);
    toDoList()
});

function toDoList(work) { 
    let newWork = inputEl.value;
    if(work) {
        newWork = work.name;
    }
    const liEl = document.createElement("li");
    if(work && work.checked) {
        liEl.classList.add("checked");
    }
    liEl.innerText = newWork;
    ulEl.appendChild(liEl);
    inputEl.value = "";
    
    const checkBtnEl = document.createElement("div")
    checkBtnEl.innerHTML = `<i class="fa-regular fa-calendar-check">`;
    liEl.appendChild(checkBtnEl);

    const trashBrnEl = document.createElement("div");
    trashBrnEl.innerHTML = `<i class="fa-solid fa-trash">`;
    liEl.appendChild(trashBrnEl);

    checkBtnEl.addEventListener("click",()=>{
        liEl.classList.toggle("checked");
        // classList.toggle("checked") liEl 요소에 checked 가 있으면 추가하고 없으면 삭제 toggle
        updateLocalStorage();
    });

    trashBrnEl.addEventListener("click",()=>{
        liEl.remove();
        updateLocalStorage();
    })
    updateLocalStorage();
}

function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");
    let list = []
    liEls.forEach(liEl =>{
        list.push({
            name : liEl.innerText,
            checked : liEl.classList.contains("checked")
        })
    })
    localStorage.setItem("list",JSON.stringify(list))
}