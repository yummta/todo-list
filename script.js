/* <li class="task-item" data-idtask="1">
<div class="info">
  <div class="check">
      <svg width="15" height="12"><use xlink:href="#check"></svg>
  </div>
  <div class="task-detail ">
    <p class="title">comprar frutos secos, frutas nona  noa naturales,chocolates y dulces</p>
    <p class="date">2019-05-02</p>
  </div>
</div>
<div class="heart">
    <svg width="20" height="18"><use xlink:href="#heart"></svg>
</div>
</li> */

a = {
  91: {
    id: 91,
    title: "Buy food",
    dueDate: "18/12/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: false
  },
  92: {
    id: 92,
    title: "Eat food",
    dueDate: "18/11/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: true
  },
  93: {
    id: 93,
    title: "Clean food",
    dueDate: "25/12/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: false
  }
};

const app = {
  idIterator: null,
  tasks: {},
  addTask: function(task) {
    let idTask = this.idIterator.next().value;
    this.tasks[idTask] = {
      id: idTask,
      title: task.title,
      dueDate: task.dueDate,
      createDate: Date(),
      priority: false,
      resolved: false
    };
    // this.parseTaskToReload(this.tasks);
    app.getSelectedValue();
  },

  addEventToTasks: function() {
    const tasks = document.getElementsByClassName("js-toggle-resolve");
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].addEventListener("click", this.changeState);
    }
  },

  changeState: function() {
    const idCurrentTask = this.dataset.idtask;
    app.tasks[idCurrentTask].resolved = !app.tasks[idCurrentTask].resolved;
    app.getSelectedValue();
  },

  changePriority: function() {
    const idCurrentTask = this.dataset.idTaskHeart;
    app.tasks[idCurrentTask].priority = !app.tasks[idCurrentTask].priority;
    app.getSelectedValue();
  },

  sendNewTask: function() {
    event.preventDefault();
    const $inputTitle = document.getElementById("title-task");
    const $inputDate = document.getElementById("due-date-task");
    if ($inputTitle.value === "") {
      alert("Please enter a valid task 👀");
      $inputTitle.focus();
    } else if ($inputDate.value === "") {
      alert("Please enter a valid date 👀");
      $inputDate.focus();
    } else {
      let dataTask = {
        title: $inputTitle.value,
        dueDate: $inputDate.value
      };
      app.addTask(dataTask);
      $inputTitle.value = "";
      $inputDate.value = "";
    }
  },
  reloadListTask: function(arrayTask) {
    const $taskList = document.getElementById("js-task-list");
    let htmlTasks = "";
    arrayTask.forEach(function(val) {
      htmlTasks += `
        <li class="task-item ${val.resolved ? "active" : ""}" >
        <div class="info js-toggle-resolve" data-idTask="${val.id}">
          <div class="check">
            <svg width="15" height="12"><use xlink:href="#check"></svg>
          </div>
          <div class="task-detail ">
            <p class="title">${val.title}</p>
            <p class="date">${val.dueDate}</p>
          </div>
        </div>
        <div class="heart ${val.priority ? "active" : ""}" data-idTaskHeart="${
        val.id
      }">
          <svg width="20" height="18"><use xlink:href="#heart"></svg>
        </div>
      </li>
      `;
    });

    $taskList.innerHTML = htmlTasks;
    app.addEventToTasks();
  },

  getSelectedValue: function() {
    let arrayTask = Object.values(this.tasks);
    var selectedValue = document.getElementById("select_id").value;
    var arraySorted = [];
    if (selectedValue == "Title-Asc") {
      arraySorted = arrayTask.sort(this.compare);
    }
    if (selectedValue == "Title-Desc") {
      arraySorted = arrayTask.sort(this.compareDesc);
    }
    if (selectedValue == "Due-Date-Asc") {
      arraySorted = arrayTask.sort(this.compareDateAsc);
    }
    if (selectedValue == "Due-Date-Desc") {
      arraySorted = arrayTask.sort(this.compareDateDesc);
    }
    if (selectedValue == "Creation-Date-Asc") {
      arraySorted = arrayTask.sort(this.compareCreateDateAsc);
    }
    if (selectedValue == "Creation-Date-Desc") {
      arraySorted = arrayTask.sort(this.compareCreateDateDesc);
    }
    if (selectedValue == "Order by") {
      arraySorted = arrayTask.sort(this.compareIdDesc);
    }
    this.reloadListTask(arraySorted);
  },
  compare: function(a, b) {
    console.log(a);
    console.log(b);
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  },

  compareDesc: function(a, b) {
    if (a.title < b.title) {
      return 1;
    }
    if (a.title > b.title) {
      return -1;
    }
    return 0;
  },

  compareDateAsc: function(a, b) {
    return new Date(a.dueDate) - new Date(b.dueDate);
  },

  compareDateDesc: function(a, b) {
    return new Date(b.dueDate) - new Date(a.dueDate);
  },

  compareCreateDateAsc: function(a, b) {
    return new Date(a.createDate) - new Date(b.createDate);
  },

  compareCreateDateDesc: function(a, b) {
    return new Date(b.createDate) - new Date(a.createDate);
  },

  compareIdDesc: function(a, b) {
    return b.id - a.id;
  },

  idGenerator: function*() {
    let id = 1;
    while (true) {
      yield id;
      id++;
    }
  },

  run: function() {
    this.idIterator = this.idGenerator();
    const $buttonSave = document.getElementById("send-new-task");
    $buttonSave.addEventListener("click", app.sendNewTask);
    app.getSelectedValue();
  }
};

app.run();
