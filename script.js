const inputBox = document.getElementById("input-box");
const Button = document.getElementById("btn");
const listContainer = document.getElementById("list-container");
const errorMessage = document.getElementById("err-msg");
const Completed = document.getElementById("completed");
const allTask = document.getElementById("All-task");
const taskCount = document.getElementById("task-count");

// const themeIcon = document.getElementById("theme");

const addTask = () => {
  if (inputBox.value.trim() === "") {
    errorMessage.textContent = "Enter a task";
  } else {
    errorMessage.textContent = "";
    let li = document.createElement("li");
    li.className =
      "bg-white  p-4 rounded-md mt-4  h-10 flex items-center break-words text-left";
    li.textContent = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = '<span class="material-symbols-outlined"> delete </span>';
    // span.innerHTML.className = "absolute right-2";
    li.appendChild(span);
    listContainer.appendChild(li);
  }
  inputBox.value = "";
  saveData();
  updateTaskCount();
};
Button.addEventListener("click", addTask);
// enter key
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      updateTaskCount();
      saveData();
    }
    if (e.target.tagName === "SPAN") {
      e.target.closest("li").remove();
      updateTaskCount();
      saveData();
    }
  },
  false,
);

Completed.addEventListener("click", () => {
  const li = document.querySelectorAll("#list-container li");

  li.forEach((item) => {
    if (item.classList.contains("checked")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

allTask.addEventListener("click", (e) => {
  e.preventDefault();

  const li = document.querySelectorAll("#list-container li");

  li.forEach((item) => {
    item.style.display = "flex";
  });
});

const updateTaskCount = () => {
  const tasks = document.querySelectorAll("#list-container li");
  const completedTask = document.querySelectorAll("#list-container li.checked");
  const taskLeft = tasks.length - completedTask.length;
  taskCount.innerHTML = `${taskLeft} Task left`;
};

const saveData = () => {
  localStorage.setItem("data", listContainer.innerHTML);
};
const showTask = () => {
  listContainer.innerHTML = localStorage.getItem("data");
};
showTask();
saveData();
updateTaskCount();
