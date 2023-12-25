function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value !== '') {
    const task = document.createElement('li');
    task.innerText = taskInput.value;

    task.addEventListener('click', function () {
      task.classList.toggle('completed');
    });

    taskList.appendChild(task);
    taskInput.value = '';
  } else {
    alert('Please enter a task!');
  }
}
