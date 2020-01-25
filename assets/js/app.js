// Variables
const taskList = document.getElementById('task-list');

// Event Listeners
eventListeners();

function eventListeners() {
    // When the form is sent
    document.querySelector('form').addEventListener('submit', addTask);
    // Remove tasks
    taskList.addEventListener('click', removeTask);

    // 'DOMContentLoaded' is when all the document has finished to load
    document.addEventListener('DOMContentLoaded', localStorageReady);
}

// Functions
function addTask(e) {
    // Method to prevent the default action of the form
    e.preventDefault()
    // Read textarea value
    const task = document.getElementById('task').value;
    // Create elements
    const li = document.createElement('li');
    const removeButton = document.createElement('a');
    removeButton.classList = 'remove-task';
    removeButton.innerText = 'X';
    // Add readed value to the li element
    li.innerText = task;
    // Add remove button to li element
    li.appendChild(removeButton);
    // Add created elements to the task-list div
    taskList.appendChild(li);
    // Add task to LocalStorage
    addToLocalStorage(task);
}

// Remove task from the DOM
function removeTask (e) {
    e.preventDefault();
    if (e.target.className === 'remove-task') {
        e.target.parentElement.remove();
        storedTask = e.target.parentElement.innerText;
        removeFromLocalStorage(storedTask);
    }
}

// Add task to LocalStorage
function addToLocalStorage(task) {
    let tasks;
    tasks = getTaskFromLocalStorage();
    // Add new element to the end of the array
    tasks.push(task);
    // JSON to string (when sending data to a web server
    // it has to be a string)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to print elements stored in LocalStorage
function localStorageReady() {
    let tasks;

    tasks = getTaskFromLocalStorage();

    tasks.forEach(function(task) {
        // Create elements
        const li = document.createElement('li');
        const removeButton = document.createElement('a');
        removeButton.classList = 'remove-task';
        removeButton.innerText = 'X';
        // Add readed value to the li element
        li.innerText = task;
        // Add remove button to li element
        li.appendChild(removeButton);
        // Add created elements to the task-list div
        taskList.appendChild(li);
    });
}

// Check if there are elements in LocalStorage, then returns an array
function getTaskFromLocalStorage() {
    let tasks;
    //Check LocalStorage values
    // If empty
    if (localStorage.getItem('tasks') === null) {
        // Create empty array
        tasks = [];
    // If not
    }else {
        // Add task to the JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(tasks, typeof tasks)
    }
    return tasks;
}

// Remove element from LocalStorage
function removeFromLocalStorage(task) {
    let tasks, removeTask
    // Substring with the text of the li element without the remove button (X)
    removeTask = task.substring(0, task.length - 1);
    // getting content from LocalStorage
    tasks = getTaskFromLocalStorage();
    // Iterate over the array
    tasks.forEach(function(task, index) {
        // If the substring value is equal to
        // a stored one
        if (removeTask === task) {
            // remove it from LocalStorage
            tasks.splice(index, 1);
        }
    });
    // Update the content of the stored array after something is removed
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
