var taskInput = document.getElementsByClassName("task-input")[0]

var addBtn = document.getElementsByClassName("add-btn")[0]

var taskList = document.querySelector(".task-lists")

var cntTaskList = document.querySelector(".task-count")

var searchInput = document.querySelector(".search-input");

console.log(searchInput.value)

var noResult = document.querySelector(".no-result")

var deleteTaskList = document.querySelector(".clear-btn")

function updateCountTaskList(){
    let cnt = taskList.children.length;
    cntTaskList.textContent = "You have " + cnt + " pending taks";
}

function deleteTask(){
    let deleteTask = document.querySelectorAll(".delete-btn")
    deleteTask.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let li = e.target.closest("li")
            li.remove();
            updateCountTaskList()
        })
    })
}



addBtn.addEventListener("click", () => {
    let taskValue = taskInput.value.trim();
    if(taskValue === ""){
        alert("Không được để rỗng")
        return
    }

    let tasks = document.querySelectorAll("li")
    for(let task of tasks){
        let text = task.childNodes[0].textContent.trim();
        if(text.toLowerCase() === taskValue.toLowerCase()){
            alert(taskValue + " đã tồn tại!!!")
            return
        }
    }

    let li = document.createElement("li");
    // li.textContent = taskValue;

    // let btn = document.createElement("button");
    // btn.className = "delete-btn";
    // btn.innerHTML = '<i class="bi bi-trash"></i>';

    // li.appendChild(btn);
    // taskList.appendChild(li);

    li.draggable = true;
    li.innerHTML = `
        ${taskValue}
        <button class="delete-btn"><i class="bi bi-trash"></i></button>
    `;

    taskList.appendChild(li)
    taskInput.value = "";
    deleteTask()
    updateCountTaskList();
})

deleteTask()

searchInput.addEventListener("input", () => {
    let key = searchInput.value.trim().toLowerCase();
    let tasks = document.querySelectorAll("li");

    let found = false
    tasks.forEach((task) => {
        let text = task.childNodes[0].textContent.trim().toLowerCase();
        if(text.includes(key)){
            task.style.display = ""
            found = true
        }else{
            task.style.display = "none"
        }
    })

    if(!found && key !== ""){
        noResult.style.display = "block";
    }else{
        noResult.style.display = "none"
    }


})


deleteTaskList.addEventListener("click", () => {
    taskList.innerHTML = "";
    updateCountTaskList();
})


// Phần kéo thả

let draggedItem = null;

// Khi bắt đầu kéo
taskList.addEventListener("dragstart", (e) => {
    // e.target là thẻ li đang kéo
    draggedItem = e.target;
    e.target.classList.add("dragging");
    // Thiết lập dữ liệu để drop — có thể dùng index, id hoặc innerHTML
    e.dataTransfer.effectAllowed = "move";
    // Một số browser đòi set dữ liệu
    e.dataTransfer.setData("text/plain", "");
});

// Khi kết thúc kéo
taskList.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    draggedItem = null;
    // Xoá các class over nếu còn sót
    taskList.querySelectorAll("li").forEach(li => li.classList.remove("over"));
});

// Khi mục được kéo đi vào vùng li khác
taskList.addEventListener("dragenter", (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target !== draggedItem) {
        e.target.classList.add("over");
    }
});

taskList.addEventListener("dragleave", (e) => {
    if (e.target && e.target.nodeName === "LI") {
        e.target.classList.remove("over");
    }
});

// Khi kéo qua li — phải preventDefault để cho phép drop
taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
});

// Khi thả vào một li
taskList.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.target && e.target.nodeName === "LI" && draggedItem) {
        e.target.classList.remove("over");
        // Chèn draggedItem trước target nếu muốn
        // hoặc sau tùy logic
        taskList.insertBefore(draggedItem, e.target.nextSibling);
    }
});

