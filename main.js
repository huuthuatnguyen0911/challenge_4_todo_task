
/* ==================================== KHỞI TẠO ARRAY LIST TASK & CÁC ENUM CONSTANTS  ========================================= */
const TaskStatus = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const TaskProgress = {
  TODO: 0,
  IN_PROGRESS: 50,
  DONE: 100,
};

const taskList = [
  // {
  //   id: "01",
  //   title: "Go to gym",
  //   priority: "high",
  //   status: TaskStatus.TODO,
  //   progress: TaskProgress.TODO,
  // },
  // {
  //   id: "02",
  //   title: "Read a book",
  //   priority: "low",
  //   status: TaskStatus.DONE,
  //   progress: TaskProgress.DONE,
  // },
  // {
  //   id: "03",
  //   title: "Go to market",
  //   priority: "medium",
  //   status: TaskStatus.IN_PROGRESS,
  //   progress: TaskProgress.IN_PROGRESS,
  // },
  // {
  //   id: "04",
  //   title: "Restart Learning Solidworks",
  //   priority: "high",
  //   status: TaskStatus.TODO,
  //   progress: TaskProgress.TODO,
  // },
  // {
  //   id: "05",
  //   title: "change slider to scroll",
  //   priority: "high",
  //   status: TaskStatus.DONE,
  //   progress: TaskProgress.DONE,
  // },
  // {
  //   id: "06",
  //   title: "To publish the article",
  //   priority: "medium",
  //   status: TaskStatus.IN_PROGRESS,
  //   progress: TaskProgress.IN_PROGRESS,
  // },
];

/* =========================================  ADD TASK MODAL ================================================================ */

const taskContainer = document.querySelector(".task-container");

taskList.forEach((task) => {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.setAttribute("data-task-id", task.id);
  taskCard.id = task.id;

  const flexWrapper1 = document.createElement("div");
  flexWrapper1.classList.add("flex", "w-100");

  const taskTitle1 = document.createElement("span");
  taskTitle1.classList.add("task-title");
  taskTitle1.textContent = "Task";

  const task1 = document.createElement("span");
  task1.classList.add("task");
  task1.textContent = task.title;

  flexWrapper1.appendChild(taskTitle1);
  flexWrapper1.appendChild(task1);

  const flexWrapper2 = document.createElement("div");
  flexWrapper2.classList.add("flex");

  const priorityTitle = document.createElement("span");
  priorityTitle.classList.add("priority-title");
  priorityTitle.textContent = "Priority";

  const priority = document.createElement("span");
  priority.classList.add(`${task.priority.toLowerCase()}-priority`, "priority");
  priority.textContent = task.priority;

  flexWrapper2.appendChild(priorityTitle);
  flexWrapper2.appendChild(priority);

  const taskStatusWrapper = document.createElement("div");
  taskStatusWrapper.classList.add("task-status-wrapper");

  const statusButton = document.createElement("button");
  statusButton.classList.add("status");
  statusButton.onclick = function () {
    if (task.status === TaskStatus.TODO) {
      task.status = TaskStatus.IN_PROGRESS;
      task.progress = TaskProgress.IN_PROGRESS;
    } else if (task.status === TaskStatus.IN_PROGRESS) {
      task.status = TaskStatus.DONE;
      task.progress = TaskProgress.DONE;
    } else {
      task.status = TaskStatus.TODO;
      task.progress = TaskProgress.TODO;
    }
    statusButton.textContent = task.status;
    const progressCircle = document.querySelector(
      `[data-task-id="${task.id}"]  .circle-progress`
    );
    progressCircle.style.strokeDashoffset =
      69.115 - (69.115 * task.progress) / 100;
  };

  statusButton.textContent = task.status;

  taskStatusWrapper.appendChild(statusButton);

  const progress = document.createElement("div");
  progress.classList.add("progress");

  const svgHTMLINPROGRESS = `
    <svg width="22" height="22" viewBox="0 0 24 24" class="circular-progressbar">
      <circle class="circle-background" cx="12" cy="12" r="11" stroke-width="2px">
      </circle>
      <circle class="circle-progress" cx="12" cy="12" r="11" stroke-width="2px" transform="rotate(-90 12 12)" style="stroke-dasharray: 69.115; stroke-dashoffset: 34.5575;">
      </circle>
    </svg>`;
    
  const svgHTMLTODO = `
  <svg width="22" height="22" viewBox="0 0 24 24" class="circular-progressbar">
      <circle class="circle-background" cx="12" cy="12" r="11" stroke-width="2px">
      </circle><circle class="circle-progress" cx="12" cy="12" r="11" stroke-width="2px" transform="rotate(-90 12 12)" style="stroke-dasharray: 69.115; stroke-dashoffset: 69.115;">
      </circle>
  </svg>`;

  const svgHTMLDONE = `<svg width="22" height="22" viewBox="0 0 24 24" class="circular-progressbar"><circle class="circle-background" cx="12" cy="12" r="11" stroke-width="2px"></circle><circle class="circle-progress" cx="12" cy="12" r="11" stroke-width="2px" transform="rotate(-90 12 12)" style="stroke-dasharray: 69.115; stroke-dashoffset: 0;"></circle></svg>`;

  progress.innerHTML =
    task.progress === TaskProgress.IN_PROGRESS
      ? svgHTMLINPROGRESS
      : task.progress === TaskProgress.TODO
      ? svgHTMLTODO
      : svgHTMLDONE;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const editImg = document.createElement("img");
  editImg.src = "./assets/images/img_edit_task.svg";
  editImg.classList.add("mr-20", "cp", "img-edit-task");
  editImg.setAttribute("data-task-id", task.id);
  editImg.alt = "Edit Task";
  editImg.onclick = function () {
    const taskId = this.getAttribute("data-task-id");

    showEditModal(taskId);
  };

  const deleteImg = document.createElement("img");
  deleteImg.src = "./assets/images/img_delete_task.svg";
  deleteImg.classList.add("cp", "img-delete-task");
  deleteImg.id = task.id;
  deleteImg.setAttribute("data-task-id", task.id);
  deleteImg.alt = "Delete Task";

  actions.appendChild(editImg);
  actions.appendChild(deleteImg);

  taskCard.appendChild(flexWrapper1);
  taskCard.appendChild(flexWrapper2);
  taskCard.appendChild(taskStatusWrapper);
  taskCard.appendChild(progress);
  taskCard.appendChild(actions);

  taskContainer.appendChild(taskCard);
});

const add_modal = document.getElementById("add_todo_task");
const add_btn = document.getElementById("add_task");
const close_add_modal = document.getElementById("close_add_modal");
const modal_content = document.querySelector(".js-modal-content");
const btn_add_task = document.querySelector(".button-add-task");
const taskTitleInput = document.querySelector(
  '.js-modal-content input[name="title"]'
);
const taskForm = document.getElementById("task-form");
const priorityButtons = document.querySelectorAll(".priority-buttons li");
let taskIdCounter = 1;

taskTitleInput.addEventListener("input", () => {
  const taskTitle = taskTitleInput.value.trim();
  if (taskTitle !== "" && taskTitle.length < 200) {
    btn_add_task.disabled = false;
  } else {
    btn_add_task.disabled = true;
  }
});


for (const button of priorityButtons) {
  button.addEventListener("click", function () {
    for (const button of priorityButtons) {
      button.classList.remove(
        "low-selected",
        "medium-selected",
        "high-selected"
      );
    }
    this.classList.add(`${this.textContent.toLowerCase()}-selected`);
  });
}

function addTask() {
  const taskTitle = taskTitleInput.value.trim();
  if (taskTitle !== "") {
    const newTask = {
      id: `0-${taskIdCounter}`,
      title: taskTitle,
      priority: getSelectedPriority(),
      status: TaskStatus.TODO,
      progress: 0,
    };

    saveTaskToLocalStorage(newTask);
    displayTask(newTask);
    taskIdCounter++;
    taskTitleInput.value = "";
    closeAddTaskModal();
  }
}

function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const taskIndex = tasks.findIndex((item) => item.id === task.id);
  const randomId = Math.floor(Math.random() * 1000);
  if (taskIndex !== -1) {
    task.id = `${taskIndex}+10`;
  } else {
    task.id = `${taskIndex}+${randomId}`;
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    displayTask(task);
  });
}
displayTasksFromLocalStorage()

function displayTask(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task-card");
  taskElement.setAttribute("data-task-id", task.id);
  taskElement.id = task.id;

  taskElement.innerHTML = `
    <div class="flex w-100">
      <span class="task-title">Task</span>
      <span class="task">${task.title}</span>
    </div>
    <div class="flex">
      <span class="priority-title">Priority</span>
      <span class="${task.priority}-priority priority">${task.priority}</span>
    </div>
    <div class="task-status-wrapper ${getStatusClass(task.status)}" [data-task-id="${task.id}"]>
      <button class="status" onclick="changeStatus('${task.id}')">
        ${task.status}
      </button>
    </div>
    <div class="progress">
    <svg width="22" height="22" viewBox="0 0 24 24" class="circular-progressbar"><circle class="circle-background" cx="12" cy="12" r="11" stroke-width="2px"></circle><circle class="circle-progress" cx="12" cy="12" r="11" stroke-width="2px" transform="rotate(-90 12 12)" style="stroke-dasharray: 69.115; stroke-dashoffset: 69.115;"></circle></svg>
    </div>
    <div class="actions">
      <img src="./assets/images/img_edit_task.svg" onclick="showEditModalUser('${task.id}')" class="mr-20 cp img-edit-task" id="${task.id}" data-task-id="${task.id}" alt="Edit Task">
      <img src="./assets/images/img_delete_task.svg" onclick=showdelete() class="cp img-delete-task" id="${task.id}" data-task-id="${task.id}" alt="Delete Task">
    </div>
  `;
  function getStatusClass(status) {
    switch (status) {
        case 'Done':
            return 'done-status';
        case 'To Do':
            return 'todo-status';
        case 'In Progress':
            return 'in-progress-status';
        default:
            return ''; 
    }
}
  // Thêm task vào đầu danh sách
  taskContainer.insertBefore(taskElement, taskContainer.firstChild);
}

function getSelectedPriority() {
  const priorityButtons = document.querySelectorAll(".priority-buttons li");
  for (const button of priorityButtons) {
    if (button.classList.contains("low-selected")) {
      button.classList.remove("medium-selected");
      button.classList.remove("high-selected");
      return "low";
    } else if (button.classList.contains("medium-selected")) {
      button.classList.remove("low-selected");
      button.classList.remove("high-selected");
      return "medium";
    } else if (button.classList.contains("high-selected")) {
      button.classList.remove("low-selected");
      button.classList.remove("medium-selected");
      return "high";
    } 
  }
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
});

function closeAddTaskModal() {
  add_modal.style.display = "none";

}
add_btn.addEventListener("click", () => {
  add_modal.style.display = "block";
  const priorityButtons = document.querySelectorAll(".priority-buttons li");
  for (const button of priorityButtons) {
    if (button.classList.contains("low-selected")) {
      btn_add_task.disabled = false;
    } else if (button.classList.contains("medium-selected")) {
      btn_add_task.disabled = false;
    } else if (button.classList.contains("high-selected")) {
      btn_add_task.disabled = false;
    } else {
      btn_add_task.disabled = true;
    }
  }
});

close_add_modal.addEventListener("click", () => {
  taskTitleInput.value = "";
  
  closeAddTaskModal();
});

add_modal.addEventListener("click", closeAddTaskModal);
modal_content.addEventListener("click", (e) => {
  e.stopPropagation();
});
/* ============================================  END ADD TASK MODAL  ============================================================ */


/* ============================================  EDIT TASK MODAL  =============================================================== */

const edit_modal = document.getElementById("edit_todo_task");
const close_edit_modal = document.getElementById("close_edit_modal");
const edit_task_img = document.querySelectorAll(".img-edit-task");
const edit_task_form = document.getElementById("edit_task_form");
const edit_modal_content = document.querySelector(".edit-modal-content");
btn_edit_task = document.querySelector(".button-edit-task");
let editingTaskId = null;


const editTitleInput = document.querySelector(
  "#edit_todo_task input[name='title']"
);
editTitleInput.addEventListener("input", () => {
  const taskTitle = editTitleInput.value.trim();
  if (taskTitle !== "" && taskTitle.length < 200) {
    btn_edit_task.disabled = false;
  } else {
    btn_edit_task.disabled = true;
  }
});

for (const img_edit of edit_task_img) {
  img_edit.addEventListener("click", (event) => {
    edit_modal.style.display = "block";
  });
}

function closeEditTaskModal() {
  edit_modal.style.display = "none";
}
function showEditTaskModal() {
  edit_modal.style.display = "block";
}

close_edit_modal.addEventListener("click", closeEditTaskModal);

function showEditModal(taskId) {
  const task = taskList.find((task) => task.id === taskId);

  if (task) {
    // Show the edit modal
    edit_modal.style.display = "block";

    const editTitleInput = document.querySelector(
      "#edit_todo_task input[name='title']"
    );
    const editPrioritySelect = document.querySelector(
      "#edit_todo_task .priority-buttons"
    );

    if (editTitleInput && editPrioritySelect) {
      editTitleInput.value = task.title;

      editPrioritySelect
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("selected"));

      const selectedPriorityElement = editPrioritySelect.querySelector(
        `li.${task.priority}`
      );

      // Khi đóng edit modal thì xoá class selected
      close_edit_modal.addEventListener("click", () => {
        edit_modal.style.display = "none";
        if (selectedPriorityElement) {
          selectedPriorityElement.classList.remove(`${task.priority}-selected`);
        }
      });

      // Lấy ra mức độ ưu tiên của task
      if (selectedPriorityElement) {
        selectedPriorityElement.classList.add(`${task.priority}-selected`);
      }
    }

    editingTaskId = taskId;
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }
}

function showEditModalUser(taskId) {
  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);

  if (taskElement) {
    edit_modal.style.display = "block";

    const editTitleInput = document.querySelector(
      "#edit_todo_task input[name='title']"
    );
    const editPrioritySelect = document.querySelector(
      "#edit_todo_task .priority-buttons"
    );

    if (editTitleInput && editPrioritySelect) {
      editTitleInput.value = taskElement.querySelector(".task").textContent;

      editPrioritySelect
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("selected"));

      const priorityClasses = taskElement.querySelector(".priority").className;

      const classArray = priorityClasses.split(" ");

      var taskPrio = "";

      for (const className of classArray) {
        if (className.endsWith("-priority")) {
          taskPrio = className.replace("-priority", "");
          break;
        }
      }
      const selectedPriorityElement = editPrioritySelect.querySelector(
        `li.${taskPrio}`
      );

      close_edit_modal.addEventListener("click", () => {
        edit_modal.style.display = "none";
        if (selectedPriorityElement) {
          selectedPriorityElement.classList.remove(`${taskPrio}-selected`);
        }
        taskPrio = "";
      });

      if (selectedPriorityElement) {
        selectedPriorityElement.classList.add(`${taskPrio}-selected`);
      }
    }
    taskId = taskElement.getAttribute("data-task-id");
    editingTaskId = taskId;
  }
}

const editButton = document.querySelector("#edit_todo_task .button");

editButton.addEventListener("click", () => {
  const editTitleInput = document.querySelector(
    "#edit_todo_task input[name='title']"
  );
  const editPrioritySelect = document.querySelector(
    "#edit_todo_task .priority-buttons"
  );
  const selectedPriorityElement = editPrioritySelect.querySelector(
    "li.low-selected, li.high-selected, li.medium-selected"
  );

  if (editTitleInput && editPrioritySelect) {

    const editedTitle = editTitleInput.value;
    const editedPriority = selectedPriorityElement.textContent;

    const task = taskList.find((task) => task.id === editingTaskId);

    if (task) {
      // câp nhật lại title và priority của task
      task.title = editedTitle;
      task.priority = editedPriority;

      // cap nhat lai giao dien
      const taskCard = document.querySelector(
        `[data-task-id="${editingTaskId}"]`
      );
      if (taskCard) {
        const titleElement = taskCard.querySelector(".task");
        const priorityElement = taskCard.querySelector(".priority");

        if (titleElement && priorityElement) {
          titleElement.textContent = editedTitle;
          priorityElement.textContent = editedPriority;
          if (task.priority === "low") {
            priorityElement.classList.remove(
              "medium-priority",
              "high-priority"
            );
            priorityElement.classList.add("low-priority");
          } else if (task.priority === "medium") {
            priorityElement.classList.remove("low-priority", "high-priority");
            priorityElement.classList.add("medium-priority");
          } else if (task.priority === "high") {
            priorityElement.classList.remove("low-priority", "medium-priority");
            priorityElement.classList.add("high-priority");
          }
        }
      }

      edit_modal.style.display = "none";
    } else {
      const taskElement = document.querySelector(
        `[data-task-id="${editingTaskId}"]`
      );
      if (taskElement) {
        const titleElement = taskElement.querySelector(".task");
        const priorityElement = taskElement.querySelector(".priority");
        if (titleElement && priorityElement) {
          titleElement.textContent = editedTitle;
          priorityElement.textContent = editedPriority;

          priorityElement.classList.remove(
            "low-priority",
            "medium-priority",
            "high-priority"
          );
          priorityElement.classList.add(
            `${editedPriority.toLowerCase()}-priority`
          );
        }
      }
      // khi thay đổi task của người dùng thì local storage cũng thay đổi theo
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskIndex = tasks.findIndex((item) => item.id === editingTaskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].title = editedTitle;
        tasks[taskIndex].priority = editedPriority;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      edit_modal.style.display = "none";
    }
  }
});

edit_task_form.addEventListener("submit", function (e) {
  e.preventDefault();
});

edit_modal.addEventListener("click", closeEditTaskModal);
edit_modal_content.addEventListener("click", (e) => {
  e.stopPropagation();
});
/* ======================================  END EDIT TASK MODAL  ================================================================= */


/* ======================================  DELETE TASK MODAL ================================================================= */

const delete_modal = document.getElementById("delete_todo_task");
const delete_task_img = document.querySelectorAll(".img-delete-task");
const agree_delete = document.getElementById("agree_btn_delete");
const cancle_delete = document.getElementById("cancle_btn_delete");
const delete_modal_content = document.querySelector(".delete-modal-content");
let taskIdToDelete = null;

function showdelete(taskId) {
  delete_modal.style.display = "block";
  taskIdToDelete = event.target.getAttribute("data-task-id");
}

function changeStatus(taskId) {
  const task = document.querySelector(`[data-task-id="${taskId}"]`);

  if (task) {
    let newStatus;
    let newProgress;

    switch (task.status) {
      case TaskStatus.TODO:
        newStatus = TaskStatus.IN_PROGRESS;
        newProgress = TaskProgress.IN_PROGRESS;
        break;
      case TaskStatus.IN_PROGRESS:
        newStatus = TaskStatus.DONE;
        newProgress = TaskProgress.DONE;
        break;
      case TaskStatus.DONE:
        newStatus = TaskStatus.TODO;
        newProgress = TaskProgress.TODO;
        break;
      default:
        newStatus = TaskStatus.TODO;
    }
    const progressCircle = document.querySelector(
      `[data-task-id="${task.id}"]  .circle-progress`
    );
    progressCircle.style.strokeDashoffset =
      69.115 - (69.115 * newProgress) / 100;

    // cập nhật lại status của task
    task.status = newStatus;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex((item) => item.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status = newStatus;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } 

    // Cập nhật lại giao diện
    const statusButton = document.querySelector(
      `[data-task-id="${taskId}"] .status`
    );
    if (statusButton) {
      statusButton.textContent = newStatus;
    }
  }
}

delete_task_img.forEach((item) => {
  item.addEventListener("click", (event) => {
    taskIdToDelete = event.target.getAttribute("data-task-id");
    delete_modal.style.display = "block";
  });
});

cancle_delete.addEventListener("click", () => {
  delete_modal.style.display = "none";
});

agree_delete.addEventListener("click", () => {
  if (taskIdToDelete) {
    deleteTask(taskIdToDelete);
    taskIdToDelete = null;
    delete_modal.style.display = "none";
  }
});

function deleteTask(taskId) {

  // Xóa task khỏi local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  const taskIndex = taskList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    taskList.splice(taskIndex, 1);
    // Cập nhật giao diện
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElement) {
      taskElement.remove();
    }
  } else {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElement) {
      taskElement.remove();
    }
  }
}

delete_modal.addEventListener('click', () => {
  delete_modal.style.display = 'none';
})

delete_modal_content.addEventListener("click", (e) => {
  e.stopPropagation();
});

/* =====================================  END DELETE TASK MODAL   ============================================================== */
