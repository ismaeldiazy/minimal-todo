// Variables
const taskList = document.getElementById('task-list');




// Event Listeners

eventListeners();

function eventListeners() {
    // When the form is sent
    document.querySelector('form').addEventListener('submit', addTask)
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
}