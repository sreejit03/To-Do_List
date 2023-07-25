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
  li.innerHTML = `
    <input type="checkbox" class="task-checkbox" />
    <span class="todo-text">${task}</span>
    <button class="delete-btn" data-id="${taskId}">Clear</button>
  `;
  todoList.appendChild(li);

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

// Function to handle task deletion
function deleteTask(taskId) {
  const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
  if (taskElement) {
    taskElement.remove();
    // Save tasks to local storage after deletion
    saveTasksToLocalStorage();
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
  // Save tasks to local storage after deleting all tasks
  saveTasksToLocalStorage();
}

// Event listener for "Delete All" button
deleteAllButton.addEventListener("click", deleteAllTasks);

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = [];
  const taskElements = document.querySelectorAll(".todo-list li");
  taskElements.forEach((taskElement) => {
    const task = {
      id: taskElement.getAttribute("data-id"),
      name: taskElement.querySelector(".todo-text").textContent,
      completed: taskElement.querySelector(".task-checkbox").checked,
    };
    tasks.push(task);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} />
        <span class="todo-text">${task.name}</span>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }
}

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();
