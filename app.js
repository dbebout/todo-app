const app = document.getElementById("app");

app.innerHTML = `
  <input id="todoInput" placeholder="Add a task..." />
  <button id="addBtn">Add</button>
  <ul id="todoList"></ul>
`;

document.getElementById("addBtn").onclick = () => {
  const input = document.getElementById("todoInput");
  const list = document.getElementById("todoList");

  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.appendChild(li);
    input.value = "";
  }
};
