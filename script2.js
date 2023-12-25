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

            // const heading = document.createElement('h2');
            // heading.textContent = file.name;
            // tasksList.appendChild(heading);

            const heading = document.createElement('h2');
            heading.textContent = file.name;

            // Adding a more visually appealing style to the heading element
            heading.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)'; // Gradient background
            heading.style.color = 'white'; // Text color
            heading.style.fontSize = '48px'; // Font size
            heading.style.fontWeight = 'bold'; // Font weight
            heading.style.padding = '20px'; // Padding
            heading.style.borderRadius = '10px'; // Rounded corners
            heading.style.transform = 'rotate(-3deg)'; // Rotate slightly
            heading.style.boxShadow = '5px 5px 15px rgba(0, 0, 0, 0.3)'; // Shadow effect

            tasksList.appendChild(heading);


            tasks.forEach(task => {
              const listItem = document.createElement('li');
              listItem.textContent = task;
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
