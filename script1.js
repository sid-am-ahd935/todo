// JSON object with file names and their respective URLs
// const files = [
//     { "name": "DSA Tasks", "url": "https://yourdomain.com/dsa-tasks.txt" },
//     { "name": "Dev Tasks", "url": "https://yourdomain.com/dev-tasks.txt" },
//     { "name": "Study Tasks", "url": "https://yourdomain.com/study-tasks.txt" }
//     // Add more objects for additional files
// ];

let files; // Declaring the variable outside the fetch block

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

    const files = JSON.stringify(files, null, 2);
    // console.log(jsonFiles); // Output the JSON data with names and URLs

    // Now 'files' can be accessed outside this block
    async function fetchTasks() {
        try {
            const tasksList = document.getElementById('tasksList');

            for (const file of files) {
                if (file.url.endsWith("tasks.txt")) {
                    const response = await fetch(file.url);
                    const data = await response.text();
                    data = data.trim();
                    const tasks = data.split('\n');

                    const heading = document.createElement('h2');
                    heading.textContent = file.name;
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
  })
  .catch(error => {
    console.error('Error:', error);
  });

// 'files' won't be immediately available here due to asynchronous nature of fetch




// async function fetchTasks() {
//     try {
//         const tasksList = document.getElementById('tasksList');

//         for (const file of files) {
//             if (file.url.endsWith("tasks.txt")) {
//                 const response = await fetch(file.url);
//                 const data = await response.text();
//                 data = data.trim();
//                 const tasks = data.split('\n');

//                 const heading = document.createElement('h2');
//                 heading.textContent = file.name;
//                 tasksList.appendChild(heading);

//                 tasks.forEach(task => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = task;
//                     tasksList.appendChild(listItem);
//                 });
//             }
//         }
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//     }
// }

// Call the function when the page loads
window.onload = fetchTasks;
