let input =document.getElementById("addinput");
let addbtn =document.getElementById("addtask");
let list = document.getElementById("tasklist");

let totaTask = document.getElementById("total");
let completedTask = document.getElementById("completed");
let pendingTask = document.getElementById("pending");

let tasks = [];


function createTask(id, taskText, completed = false){

    let li = document.createElement("li");
    let text = document.createElement("span");
    let btnBox = document.createElement("div")
    btnBox.classList.add("btnBox");

    text.innerText=taskText;

    let completebtn = document.createElement("button");

    completebtn.innerHTML =completed ?'<i class="fa-solid fa-rotate-left"></i>' :'<i class="fa-solid fa-check"></i>';

    let editbtn = document.createElement("button");
    editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    

    let delbtn = document.createElement("button");
    delbtn.innerHTML= '<i class="fa-solid fa-trash"></i>';

    if(completed){
        text.classList.add("done")   
        delbtn.classList.add("completed")
    }

    completebtn.addEventListener("click", ()=>{
        text.classList.toggle("done")

        if(completebtn.innerHTML.includes("check")){
            completebtn.innerHTML='<i class="fa-solid fa-rotate-left"></i>'
        }
        else{
            completebtn.innerHTML='<i class="fa-solid fa-check"></i>'
        }

        let found = tasks.find(t=> t.id === id)
        if(found){
            found.completed = !found.completed
        }

        delbtn.classList.toggle("completed");
        updateCounter();
        saveTask();

    })

    editbtn.addEventListener("click", ()=>{
        let inputEdit =document.createElement("input");
        inputEdit.type="text";
        inputEdit.value = text.innerText;

        li.replaceChild(inputEdit, text);
        inputEdit.focus();

        inputEdit.addEventListener("keypress", (e)=>{
            if(e.key === "Enter"){
                let newValue = inputEdit.value.trim();

                if(newValue === ""){
                    return;
                }
                
                text.innerText = newValue;
                let found = tasks.find(t=> t.id === id)
                if(found){
                    found.text =newValue;
                }

                taskText = newValue;
                li.replaceChild(text, inputEdit);
                saveTask();
            }

        })
    })

    delbtn.addEventListener("click", ()=>{
        li.remove()
        
        tasks = tasks.filter(t=> t.id !== id)

        updateCounter();
        saveTask();

    })

    
    btnBox.appendChild(completebtn);
    btnBox.appendChild(editbtn);
    btnBox.appendChild(delbtn);
    
    li.appendChild(text);
    li.appendChild(btnBox);
    list.appendChild(li);
}




function addTask(){
    let task = input.value.trim();
    
    if(task == "" || task == null){
        
        return
    }

    let exists = tasks.find(t=> t.text === task)
    if(exists){
        alert("Task already exists")
        return 
    }


    tasks.push({
        id: Date.now(),
        text:task,
        completed:false

    })

    let newTask = {
        id: Date.now(),
        text:task,
        completed:false
    }    
    tasks.push(newTask);
    
    createTask(newTask.id, newTask.text, newTask.completed);
    
    saveTask()
    input.value="";
    updateCounter();

}



input.addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            addTask()
        }
    })

addbtn.addEventListener("click", addTask)

function updateCounter(){
    let allTask = document.querySelectorAll("li");
    let completed = document.querySelectorAll(".done");
    let ration = document.querySelector(".taskration");

    
    let total = allTask.length;
    let done = completed.length;
    ration.innerText= done + "/" + total;

    let percent = 0;
    if(total>0){
        percent = (done/total) * 360;
    }

    ration.style.background = `conic-gradient(#00b894 ${percent}deg, #dfe6e9 ${percent}deg)`;

    totaTask.innerText = "Total: " + allTask.length;
    completedTask.innerText="Completed: " +completed.length;
    pendingTask.innerText= "Pending: "+ (allTask.length - completed.length);
}


function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));     //array ko string me convert karke  browser me save karta hai
}

function loadTask(){
    let data =localStorage.getItem("tasks")
    if(data){
        tasks = JSON.parse(data)
        tasks.forEach((t)=>{
            createTask(t.id, t.text, t.completed)
        })
    }

    updateCounter()
}
loadTask();