// Enable sidebar navigation
const navButtons = document.querySelectorAll(".nav-btn");

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".nav-btn.active")?.classList.remove("active");
      btn.classList.add("active");

      const page = btn.getAttribute("data-page");
      loadPage(page);
    });
  });

  // Load default page
  loadPage("todo");
});



// Handle sidebar navigation
function loadPage(page) {
  const mainContent = document.getElementById("mainContent");

  // ---------------------------
  // TO‑DO PAGE
  // ---------------------------
  if (page === "todo") {
    mainContent.innerHTML = `
      <h2>To‑Do List</h2>

      <div class="todo-inputs">
        <input id="todoInput" type="text" placeholder="Add a task..." />

        <select id="categorySelect">
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="Fitness">Fitness</option>
        </select>

        <select id="prioritySelect">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onclick="addTodo()">Add</button>
      </div>

      <ul id="todoList"></ul>
    `;

    loadTodos();
    return;
  }

  // ---------------------------
  // WEATHER PAGE
  // ---------------------------
  if (page === "weather") {
    mainContent.innerHTML = `
      <div class="weather-container">
        <h2>Weather</h2>
        <div id="weatherCard" class="weather-card">Loading weather...</div>

        <h3>7‑Day Forecast</h3>
        <div id="forecast" class="forecast-row">Loading...</div>
      </div>
    `;

    loadWeather();
    loadForecast();
    return;
  }

  // ---------------------------
  // NOTES PAGE
  // ---------------------------
  if (page === "notes") {
    mainContent.innerHTML = `
      <h2>Notes</h2>
      <p>Notes module coming soon.</p>
    `;
    return;
  }

  // ---------------------------
  // AI CHAT PAGE
  // ---------------------------
  if (page === "chat") {
    mainContent.innerHTML = `
      <h2>AI Chat</h2>
      <p>AI chat module coming soon.</p>
    `;
    return;
  }
}

// Load default page
loadPage("todo");
