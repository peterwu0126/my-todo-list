function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // 創建一個新項目
    const li = document.createElement('li');
    li.textContent = taskText;

    // 創建刪除按鈕
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => taskList.removeChild(li);

    // 加入完成的功能
    li.onclick = () => li.classList.toggle('completed');

    // 添加到列表中
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = ''; // 清空輸入框
}
 
