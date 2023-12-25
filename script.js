// Function to fetch and display tasks
async function fetchTasks() {
  try {
      const response = await fetch('https://raw.githubusercontent.com/sid-am-ahd935/todo/main/tasks.txt'); // Replace with your actual URL
      const data = await response.text();
      const tasks = data.split('\n');

      const tasksList = document.getElementById('tasksList');
      tasks.forEach(task => {
          const listItem = document.createElement('li');
          listItem.textContent = task;
          tasksList.appendChild(listItem);
      });
  } catch (error) {
      console.error('Error fetching tasks:', error);
  }
}

// Call the function when the page loads
window.onload = fetchTasks;
