// Load the Todo UI into the #app container
function loadTodoUI() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="todo-input-row">
      <input id="todoInput" placeholder="Add a task..." />

      <select id="categorySelect">
        <option value="Personal">Personal</option>
        <option value="Errands">Errands</option>
        <option value="Fitness">Fitness</option>
        <option value="Family">Family</option>
      </select>

      <select id="prioritySelect">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button id="addBtn">Add</button>
    </div>

    <ul id="todoList"></ul>
  `;

  document.getElementById("addBtn").onclick = addTodo;
}

// Render the todo list
function renderTodos() {
  const list = document.getElementById("todoList");
  if (!list) return; // Prevent errors if UI not loaded yet

  list.innerHTML = "";

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("fade-in");

    li.innerHTML = `
      <div class="todo-main">
        <span class="todo-text">${todo.text}</span>
        <span class="badge category">${todo.category}</span>
        <span class="badge priority ${todo.priority.toLowerCase()}">${todo.priority}</span>
      </div>

      <button class="deleteBtn" data-index="${index}">✕</button>
    `;

    list.appendChild(li);
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.onclick = () => {
      const index = btn.getAttribute("data-index");
      deleteTodo(index);
    };
  });
}

// Add a new todo
function addTodo() {
  const
