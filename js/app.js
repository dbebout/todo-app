// -----------------------------
// LOAD THE TODO UI
// -----------------------------
function loadTodoUI() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("ERROR: #app not found in DOM");
    return;
  }

  app.innerHTML = `
    <p><strong>Your Tasks:</strong></p>
  `;
}

// -----------------------------
// LOAD TODOS FROM LOCALSTORAGE
// -----------------------------
function getTodos() {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}

// -----------------------------
// SAVE TODOS TO LOCALSTORAGE
// -----------------------------
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// -----------------------------
// RENDER TODOS
// -----------------------------
function renderTodos() {
  const todos = getTodos();
  const list = document.getElementById("todoList");

  if (!list) {
    console.error("ERROR: #todoList not found");
    return;
  }

  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <span>
        <strong>${todo.text}</strong>
        <em>(${todo.category}, ${todo.priority})</em>
      </span>
      <button onclick="deleteTodo(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

// -----------------------------
// ADD A TODO
// -----------------------------
function addTodo() {
  const input = document.getElementById("todoInput");
  const category = document.getElementById("categorySelect");
  const priority = document.getElementById("prioritySelect");

  if (!input.value.trim()) return;

  const todos = getTodos();

  todos.push({
    text: input.value.trim(),
    category: category.value,
    priority: priority.value
  });

  saveTodos(todos);
  input.value = "";

  renderTodos();
}

// -----------------------------
// DELETE A TODO
// -----------------------------
function deleteTodo(index) {
  const todos = getTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}
