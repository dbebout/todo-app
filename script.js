const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const overdueTasksEl = document.getElementById("overdueTasks");
const progressFill = document.getElementById("progressFill");

// Load theme
document.body.classList.toggle("light", localStorage.getItem("theme") === "light");
themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const mode = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", mode);
  themeToggle.textContent = mode === "light" ? "☀️" : "🌙";
});

// Load tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const due = dateInput.value;

  if (text === "" || due === "") return;

  const newTask = {
    id: Date.now(),
    text,
    due,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateDashboard() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  const today = new Date().toISOString().split("T")[0];
  const overdue = tasks.filter(t => !t.completed && t.due < today).length;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  overdueTasksEl.textContent = overdue;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  progressFill.style.width = percent + "%";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const left = document.createElement("div");
    left.className = "task-left";

    const text = document.createElement("span");
    text.className = "task-text";
    if (task.completed) text.classList.add("completed");
    text.textContent = task.text;

    const due = document.createElement("span");
    due.className = "due-date";
    due.textContent = "Due: " + task.due;

    const today = new Date().toISOString().split("T")[0];
    if (!task.completed && task.due < today) {
      due.classList.add("overdue");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    left.appendChild(text);
    left.appendChild(due);

    li.appendChild(left);
    li.appendChild(checkbox);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateDashboard();
}