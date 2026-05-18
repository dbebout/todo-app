const mainContent = document.getElementById("mainContent");
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".nav-btn.active").classList.remove("active");
    btn.classList.add("active");

    const page = btn.getAttribute("data-page");
    loadPage(page);
  });
});

// Load the correct page
function loadPage(page) {
  if (page === "todo") {
    mainContent.innerHTML = `<div id="app"></div>`;
    loadTodoUI();
    renderTodos();
    return;
  }

  if (page === "weather") {
    mainContent.innerHTML = `
      <h1>Weather</h1>
      <p>Weather module coming soon.</p>
    `;
    return;
  }

  if (page === "notes") {
    mainContent.innerHTML = `
      <h1>Notes</h1>
      <p>Notes module coming soon.</p>
    `;
    return;
  }

  if (page === "ai") {
    mainContent.innerHTML = `
      <h1>AI Chat</h1>
      <p>AI chat module coming soon.</p>
    `;
    return;
  }
}

// Load To‑Do by default
loadPage("todo");
