const todoList = document.querySelector(".todo-list");
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const deleteAllButton = document.getElementById("delete-all-btn");

// Function to add a new task
function addTask(task) {
  const li = document.createElement("li");
  const taskId = Date.now(); // Generate a unique ID for the task
  li.setAttribute("data-id", taskId);
  li.innerHTML = `${task} <button class="delete-btn" data-id="${taskId}">Delete</button>`;
  todoList.appendChild(li);
}

// Function to handle task deletion
function deleteTask(taskId) {
  const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
  if (taskElement) {
    taskElement.remove();
  }
}

// Event listener for "Add" button
addBtn.addEventListener("click", () => {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    addTask(newTask);
    todoInput.value = "";
  }
});

// Function to handle adding a task when pressing Enter key
function handleEnterKey(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
      addTask(newTask);
      todoInput.value = "";
    }
  }
}

// Event listener for "keydown" event on the input field
todoInput.addEventListener("keydown", handleEnterKey);

// Event delegation to handle clicks on the delete button
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    // Get the task ID from the data-id attribute of the delete button
    const taskId = event.target.getAttribute("data-id");
    deleteTask(taskId);
  }
});

// Function to filter tasks based on the search query
function searchTasks(query) {
  const tasks = document.querySelectorAll(".todo-list li");
  tasks.forEach((task) => {
    const taskName = task.textContent.toLowerCase();
    if (taskName.includes(query.toLowerCase())) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// Event listener for "Search" button
searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.trim();
  searchTasks(searchQuery);
});

// Event listener for clearing the search input
searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.trim();
  searchTasks(searchQuery);
});

// Function to delete all tasks
function deleteAllTasks() {
  todoList.innerHTML = "";
}

// Event listener for "Delete All" button
deleteAllButton.addEventListener("click", deleteAllTasks);
