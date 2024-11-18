// DOM 元素選取
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const filterCategory = document.getElementById("filterCategory");
const clearAllButton = document.getElementById("clearAllButton");

let tasks = [];

// 新增任務
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const taskCategory = categorySelect.value;

    if (taskText !== "") {
        const task = { text: taskText, category: taskCategory, completed: false };
        tasks.push(task);
        taskInput.value = "";

        // 確保按鈕保持可見
        addTaskButton.style.visibility = 'visible';
        addTaskButton.style.display = 'inline-block';

        renderTasks();
    }
});


// 篩選任務
filterCategory.addEventListener("change", () => {
    renderTasks();
});

// 清空所有任務
clearAllButton.addEventListener("click", () => {
    if (confirm("確定要清空所有任務嗎？")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// 渲染任務列表
function renderTasks() {
    const filter = filterCategory.value;
    taskList.innerHTML = "";

    const filteredTasks =
        filter === "All" ? tasks : tasks.filter(task => task.category === filter);

    if (filteredTasks.length === 0) {
        const noTaskMessage = document.createElement("p");
        noTaskMessage.textContent = "目前沒有符合條件的任務！";
        noTaskMessage.style.color = "#666";
        taskList.appendChild(noTaskMessage);
        return;
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        const taskText = document.createElement("span");
        taskText.textContent = `${task.text} (${task.category})`;
        taskText.style.flexGrow = "1";
        taskText.style.cursor = "pointer";
        taskText.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "刪除";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((t, i) => i !== index);
            saveTasks();
            renderTasks();
        });

        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    // 確保新增按鈕在所有操作後保持可見
    addTaskButton.style.visibility = 'visible';
    addTaskButton.style.display = 'inline-block';
}

// 保存任務到 localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 加載任務
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// 初始化
loadTasks();
