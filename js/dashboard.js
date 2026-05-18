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

function loadPage(page) {
  if (page === "todo") {
    mainContent.innerHTML = `<div id="app"></div>`;
    renderTodos(); // from your todo app
  }

  if (page === "weather") {
    mainContent.innerHTML = `
      <h1>Weather</h1>
      <p>Weather module coming soon.</p>
    `;
  }

  if (page === "notes") {
    mainContent.innerHTML = `
      <h1>Notes</h1>
      <p>Notes module coming soon.</p>
    `;
  }

  if (page === "ai") {
    mainContent.innerHTML = `
      <h1>AI Chat</h1>
      <p>AI chat module coming soon.</p>
    `;
  }
}

