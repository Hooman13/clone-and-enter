let taskIDCounter = 0;
const taskList = [];

const TASK_STATUS = Object.freeze({
  todo: "todo",
  done: "done",
});

function taskFactory(text = "", status = TASK_STATUS.todo) {
  if (typeof text !== "string") {
    return;
  }

  if (status !== TASK_STATUS.todo && status !== TASK_STATUS.done) {
    return;
  }

  const taskObject = {
    id: `tasks-uuid-${taskIDCounter}`,
    text,
    status, // status: status
  };

  taskIDCounter++;

  return taskObject;
}

function renderTask(taskObject) {
  if (!taskObject || typeof taskObject !== "object") {
    return;
  }

  const li = document.createElement("li");
  li.classList.add("todoListItem");

  const p = document.createElement("p");
  p.innerHTML = taskObject.text;

  const div = document.createElement("div");
  const check = document.createElement("span");
  check.classList.add("fa", "fa-check-circle", "text-green-500");

  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("fa", "fa-minus-circle", "text-red-500");

  if (taskObject.status === TASK_STATUS.todo) {
    li.classList.add("todoListItem--todo");
  } else if (taskObject.status === TASK_STATUS.done) {
    li.classList.add("todoListItem--done");
    p.classList.add("line-through");
  }
  li.appendChild(p);
  div.appendChild(deleteBtn);
  div.appendChild(check);
  li.appendChild(div);

  return li;
}

function cloneTask(text) {
  let temp = document.querySelector("#todo-template");
  let clon = temp.content.cloneNode(true);
  clon.querySelector("p").innerHTML = text;
  const todoListElement = document.querySelector("#todo-list");
  todoListElement.appendChild(clon);
}


function renderTasks() {
  const todoListElement = document.querySelector("#todo-list");
  todoListElement.innerHTML = "";
  for (let i = 0; i < taskList.length; i += 1) {
    let renderedTask = renderTask(taskList[i]);
    todoListElement.appendChild(renderedTask);
  }
}

function createTask(text = "") {
  const task = taskFactory(text);
  taskList.push(task);
  // renderTasks();
  cloneTask(text);
}

const createTaskForm = document.querySelector("#create-todo");
const createTaskInput = createTaskForm.querySelector("input");
const createTaskButton = createTaskForm.querySelector("button");

function createTaskHandler() {
  const value = createTaskInput.value;
  if (!value) {
    return;
  }
  createTask(value);
  createTaskInput.value = "";
}

createTaskButton.addEventListener("click", createTaskHandler);
