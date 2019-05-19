const fakeData = {
  91: {
    id: 91,
    title: "Buy food",
    dueDate: "18/12/2019",
    createDate: "18/12/2018",
    priority: true,
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
  },
  41: {
    id: 41,
    title: "Buy food",
    dueDate: "18/12/2019",
    createDate: "18/12/2018",
    priority: true,
    resolved: true
  },
  42: {
    id: 42,
    title: "Eat food",
    dueDate: "18/11/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: true
  },
  43: {
    id: 43,
    title: "Clean food",
    dueDate: "25/12/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: false
  },
  191: {
    id: 191,
    title: "Buy food",
    dueDate: "18/12/2019",
    createDate: "18/12/2018",
    priority: true,
    resolved: true
  },
  192: {
    id: 192,
    title: "Eat food",
    dueDate: "18/11/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: true
  },
  193: {
    id: 193,
    title: "Clean food",
    dueDate: "25/12/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: false
  },
  141: {
    id: 141,
    title: "Buy food",
    dueDate: "18/12/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: true
  },
  142: {
    id: 142,
    title: "Eat food",
    dueDate: "18/11/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: true
  }
}

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
    app.getSelectedValue();
  },

  addEventToTasks: function() {
    const tasks = document.getElementsByClassName("js-toggle-resolve");
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].labelToUpdate = "resolved"
      tasks[i].addEventListener("click", app.changeStateBoolanLabel);
    }
  },

  addEventToPriority: function() {
    const priorities = document.getElementsByClassName("js-priority");
    for (let i = 0; i < priorities.length; i++) {
      priorities[i].labelToUpdate = "priority"
      priorities[i].addEventListener("click", app.changeStateBoolanLabel);
    }
  },

  changeStateBoolanLabel: function() {
    const idCurrentTask = this.dataset.idtask;
    app.tasks[idCurrentTask][this.labelToUpdate] = !app.tasks[idCurrentTask][this.labelToUpdate];
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
        <li class="c-task-item task-item ${val.resolved ? "-resolved" : "-pending"} ${val.priority ? "-prioritized" : ""}" >
          <div class="info js-toggle-resolve" data-idTask="${val.id}">
            <div class="check">
              <svg width="15" height="12"><use xlink:href="#check"></svg>
            </div>
            <div class="task-detail ">
              <p class="title">${val.title}</p>
              <p class="date">${val.dueDate}</p>
            </div>
          </div>
          <div class="heart js-priority" data-idTask="${val.id}">
            <svg width="20" height="18"><use xlink:href="#heart"></svg>
          </div>
        </li>
      `;
    });

    $taskList.innerHTML = htmlTasks;
    app.addEventToPriority();
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


const manageDom = function() {
  let dom, fn, catchDom, addEvents, init
  dom = {}
  fn = {}

  catchDom = function(){
    dom.buttonShowForm = document.getElementById("js-button-show-form")
    dom.buttonHideForm = document.getElementById("js-button-hide-form")
    dom.blockForm = document.getElementById("js-block-form")
    dom.buttonSendNewTask = document.getElementById("send-new-task")
    dom.selectFilter = document.getElementById("js-select-filter")
    dom.taskList = document.getElementById("js-task-list")
  }

  addEvents = function(){
    dom.buttonShowForm.addEventListener("click", fn.showForm)
    dom.buttonHideForm.addEventListener("click", fn.hideForm)
    dom.buttonSendNewTask.addEventListener("click", fn.hideForm)
    dom.selectFilter.addEventListener("change", fn.filterList)
  }

  fn.filterList = function () {
    const filter = this.value
    if ( filter != "all" ) {
      dom.taskList.classList.remove("-pending", "-prioritized", "-resolved")
      dom.taskList.classList.add("-filtered", `-${filter}`)
    } else {
      dom.taskList.classList.remove("-filtered", "-pending", "-prioritized", "-resolved")
    }
  }

  fn.showForm = function () {
    dom.blockForm.classList.add("-active")
    dom.buttonShowForm.classList.remove("-active")
    dom.buttonHideForm.classList.add("-active")
  }

  fn.hideForm = function () {
    dom.blockForm.classList.remove("-active")
    dom.buttonShowForm.classList.add("-active")
    dom.buttonHideForm.classList.remove("-active")
  }

  init = function() {
    catchDom()
    addEvents()
  }

  return init()
}

manageDom();
app.run();