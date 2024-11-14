function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // �Ыؤ@�ӷs����
    const li = document.createElement('li');
    li.textContent = taskText;

    // �ЫاR�����s
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => taskList.removeChild(li);

    // �[�J�������\��
    li.onclick = () => li.classList.toggle('completed');

    // �K�[��C��
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = ''; // �M�ſ�J��
}
 
