const todos = document.querySelectorAll(".todo");
const col_status = document.querySelectorAll(".columns");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart is triggered");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd is triggered");
}

col_status.forEach((columns) => {
  columns.addEventListener("dragover", dragOver);
  columns.addEventListener("dragenter", dragEnter);
  columns.addEventListener("dragleave", dragLeave);
  columns.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}
function dragEnter() {
  this.style.border = "1px dashed red";
  console.log("dragEnter is triggered");
}
function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave is triggered");
}
function dragDrop() {
  this.appendChild(draggableTodo);
  console.log("dragDrop is triggered");
}

// MODAL

const btns = document.querySelectorAll("[data-target-modal]");
const closeModal = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

closeModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

// create Todo

const todoSubmit = document.getElementById("todo-submit");

todoSubmit.addEventListener("click", creareTodo);
function creareTodo() {
  const todoDiv = document.createElement("div");
  const inputValue = document.getElementById("todo-input").value;
  const text = document.createTextNode(inputValue);

  todoDiv.appendChild(text);
  todoDiv.classList.add("todo");
  todoDiv.setAttribute("draggable", true);

  // create Span
  const span = document.createElement("span");
  const spanText = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(spanText);
  todoDiv.appendChild(span);

  open_todo.appendChild(todoDiv);

  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });

  todoDiv.addEventListener("dragstart", dragStart);
  todoDiv.addEventListener("dragend", dragEnd);

  document.getElementById("todo-input").value = "";
  todo_modal.classList.remove("active");
  overlay.classList.remove("active");
}

const closeBtn = document.querySelectorAll(".close");
closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});
