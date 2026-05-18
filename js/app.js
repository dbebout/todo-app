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

function renderTodos() {
  const list = document.getElementById("todoList");
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

function addTodo() {
  const text = document.getElementById("todoInput").value.trim();
  const category = document.getElementById("categorySelect").value;
  const priority = document.getElementById("prioritySelect").value;

  if (text === "") return;

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push({ text, category, priority });

  localStorage.setItem("todos", JSON.stringify(todos));

  document.getElementById("todoInput").value = "";
  renderTodos();
}

function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

document.getElementById("addBtn").onclick = addTodo;

renderTodos();

