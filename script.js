const fakeTask = {
  1: {
    id: 1,
    title: "Buy food",
    dueDate: "18/12/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: false
  },
  2: {
    id: 2,
    title: "Eat food",
    dueDate: "18/11/2019",
    createDate: "18/12/2018",
    priority: false,
    resolved: true
  },
  3: {
    id: 3,
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
    this.parseTaskToReload(this.tasks);
  },

  sendNewTask: function() {
    event.preventDefault();
    let titleTask = document.getElementById("title-task").value;
    let dueDateTask = document.getElementById("due-date-task").value;
    let dataTask = {
      title: titleTask,
      dueDate: dueDateTask
    };
    app.addTask(dataTask);
  },

  parseTaskToReload: function(objTask) {
    let result = Object.values(objTask);
    this.reloadListTask(result);
  },

  reloadListTask: function(arrayTask) {
    const $taskList = document.getElementById("js-task-list");
    let htmlTasks = "";
    arrayTask.forEach(function(val) {
      htmlTasks += `<li class="task-item ${val.resolved ? "active" : ""}"> 
      ${val.title}, ${val.dueDate}, ${val.createDate} </li>`;
    });
    $taskList.innerHTML = htmlTasks;
  },

  toggleState: function() {},
  compare: function(a,b) {
    if (a.title < b.title){
      return -1;
    }
    if (a.title > b.title){
      return 1;
    }
    return 0;
  },

  compareDesc: function(a,b) {
    if (a.title < b.title){
      return 1;
    }
    if (a.title > b.title){
      return -1;
    }
    return 0;
  },

  compareDateAsc: function(a,b){
    return new Date(a.dueDate) - new Date(b.dueDate);
  },

  compareDateDesc: function(a,b){
    return new Date(b.dueDate) - new Date(a.dueDate);
  },

  compareCreateDateAsc: function(a,b){
    return new Date(a.createDate) - new Date(b.createDate);
  },

  compareCreateDateDesc: function(a,b){
    return new Date(b.createDate) - new Date(a.createDate);
  },

  getSelectedValue: function() {
    var selectedValue = document.getElementById("select_id").value;
    if (selectedValue == "Title-Asc") { this.orderbyTaskTitleAsc(); }
    if (selectedValue == "Title-Desc") { this.orderbyTaskTitleDesc(); }
    if (selectedValue == "Due-Date-Asc") { this.orderbyDueDateAsc(); }
    if (selectedValue == "Due-Date-Desc") { this.orderbyDueDateDesc(); }
    if (selectedValue == "Creation-Date-Asc") { this.orderbyCreateDateAsc(); }
    if (selectedValue == "Creation-Date-Desc") { this.orderbyCreateDateDesc(); }
  },

  orderbyTaskTitleAsc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compare);
    this.reloadListTask(arraySorted);
  },

  orderbyTaskTitleDesc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareDesc);
    this.reloadListTask(arraySorted);
  },

  orderbyDueDateAsc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareDateAsc);
    this.reloadListTask(arraySorted);
  },

  orderbyDueDateDesc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareDateDesc);
    this.reloadListTask(arraySorted);
  },

  orderbyCreateDateAsc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareCreateDateAsc);
    this.reloadListTask(arraySorted);
  },

  orderbyCreateDateDesc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareCreateDateDesc);
    this.reloadListTask(arraySorted);
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
  }
};

app.run();
