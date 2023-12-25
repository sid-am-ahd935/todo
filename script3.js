let files; // Declare the variable outside the fetch block

const owner = 'sid-am-ahd935';
const repo = 'tasklist';
const path = '';

fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`.trim())
  .then(response => response.json())
  .then(data => {
    files = data.map(file => ({
      name: file.name,
      url: file.download_url
    }));

    // Define and call fetchTasks function directly after files are populated
    async function fetchTasks() {
      try {
        const tasksList = document.getElementById('tasksList');

        for (const file of files) {
          if (file.url.endsWith("tasks.txt")) {
            const response = await fetch(file.url);
            const data = await response.text();
            const tasks = data.trim().split('\n');

            const heading = document.createElement('h2');
            heading.textContent = file.name;
            heading.classList.add('heading'); // Apply 'heading' class

            tasksList.appendChild(heading);

            // Create and style task items
            tasks.forEach(task => {
              const listItem = document.createElement('li');
              listItem.textContent = task;
              listItem.classList.add('task-item'); // Apply 'task-item' class

              tasksList.appendChild(listItem);
            });
          }
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    // Call fetchTasks function directly after defining it
    fetchTasks();
  })
  .catch(error => {
    console.error('Error:', error);
  });
