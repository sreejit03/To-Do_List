// Function to get todos from local storage or initialize an empty array
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

// Function to save todos to local storage
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to create a new todo item
function createTodoItem(text, completed, date) {
  return { text, completed, date };
}

// Function to render a single todo item
function renderTodoItem(todo, index) {
  const li = document.createElement("li");
  li.className = "li";

  const checkbox = document.createElement("input");
  checkbox.className = "form-check-input";
  checkbox.type = "checkbox";
  checkbox.value = "option1";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => toggleTodoCompleted(index));

  const label = document.createElement("label");
  label.className = "form-check-label";

  const spanText = document.createElement("span");
  spanText.className = "todo-text";
  spanText.textContent = todo.text;

  const deleteButton = document.createElement("span");
  deleteButton.className = "span-button";
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.addEventListener("click", () => deleteTodo(index));

  const editButton = document.createElement("span");
  editButton.className = "span-button";
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editButton.addEventListener("click", () => editTodo(index));

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(spanText);
  li.appendChild(deleteButton);
  li.appendChild(editButton);

  todoList.appendChild(li);
}

// Function to render all todos
function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    showNoTasksMessage();
    return;
  }

  todos.forEach((todo, index) => {
    renderTodoItem(todo, index);
  });
}

// Function to show the "No tasks found" message
function showNoTasksMessage() {
  todo_main.innerHTML = `
    <img class="face" src="assets/thinking.png" alt="Thinking Face">
    <h1 class="not-found"> No tasks found!</h1>
  `;
}

// Function to add a new todo
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const currentDate = new Date();

    if (editIndex === -1) {
      const newTodo = createTodoItem(todoText, false, currentDate.toLocaleString());
      todos.push(newTodo);
    } else {
      todos[editIndex].text = todoText;
      todos[editIndex].date = currentDate.toLocaleString();
      editIndex = -1;
      addButton.style.display = "inline";
      updateButton.style.display = "none";
    }

    saveTodos(todos);
    renderTodos();
    todoInput.value = "";
  }

  return false;
}

// Function to toggle the completion status of a todo
function toggleTodoCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos(todos);
  renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}

// Function to edit a todo
function editTodo(index) {
  const todoText = todos[index].text;
  todoInput.value = todoText;
  editIndex = index;
  addButton.style.display = "none";
  updateButton.style.display = "inline";
}

// Function to search todos
function searchTodo() {
  const searchQuery = searchInput.value.trim().toLowerCase();
  if (searchQuery !== "") {
    const searchResults = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery)
    );
    renderSearchResults(searchResults);
  } else {
    renderTodos();
  }
}

// Function to render search results
function renderSearchResults(results) {
  todoList.innerHTML = "";

  if (results.length > 0) {
    results.forEach((todo, index) => {
      renderTodoItem(todo, index);
    });
  } else {
    showNoTasksMessage();
  }
}

// Initialize variables and event listeners
let todos = getTodos();
let editIndex = -1;
const todoForm = document.querySelector(".input-section");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector("#addBtn");
const updateButton = document.getElementById("update-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const todo_main = document.querySelector(".todos");

todoForm.addEventListener("submit", addTodo);
updateButton.addEventListener("click", addTodo);
searchButton.addEventListener("click", searchTodo);
searchInput.addEventListener("input", searchTodo);
renderTodos();
