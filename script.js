
// li template
//<li class="task-item" data-idTask="1">
//  <span class="title">title</span>
//  <pre class="date">date</pre>
//</li>

const app = {
  idIterator: null,
  tasks: {},
  lastSort: [],
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

  addEventToTasks: function(){
    const tasks = document.getElementsByClassName("task-item")
    for( let i = 0; i < tasks.length; i++){
      tasks[i].addEventListener("click", this.changeState )
    }
  },

  changeState: function() {
    const idCurrentTask = this.dataset.idtask
    app.tasks[idCurrentTask].resolved = !app.tasks[idCurrentTask].resolved
    if ( app.lastSort.length ) {
      app.reloadListTask(app.lastSort)
    } else {
      app.parseTaskToReload(app.tasks)
    }
  },

  sendNewTask: function() {
    event.preventDefault();
    const $inputTitle = document.getElementById("title-task")
    const $inputDate = document.getElementById("due-date-task")
    if ($inputTitle.value === ""){
      alert("Please enter a valid task 👀");
      $inputTitle.focus();
    } else if($inputDate.value === "") {
      alert("Please enter a valid date 👀");
      $inputDate.focus();
    } else {
      let dataTask = {
        title: $inputTitle.value,
        dueDate: $inputDate.value
      };
      app.addTask(dataTask);
      $inputTitle.value = ""
      $inputDate.value = ""
    }

  },

  parseTaskToReload: function(objTask) {
    let result = Object.values(objTask);
    app.reloadListTask(result);
  },

  reloadListTask: function(arrayTask) {
    const $taskList = document.getElementById("js-task-list");
    let htmlTasks = "";
    arrayTask.forEach(function(val) {
      htmlTasks += `
        <li
          class="task-item ${val.resolved ? "active" : ""}"
          data-idTask="${val.id}"
        >
          <span class="title">${val.title}</span>
          <span class="date">${val.dueDate}</span>
        </li>
      `;
    });

    $taskList.innerHTML = htmlTasks;
    app.addEventToTasks()
  },

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
    this.lastSort = arraySorted
    this.reloadListTask(arraySorted);
  },

  orderbyTaskTitleDesc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareDesc);
    this.lastSort = arraySorted
    this.reloadListTask(arraySorted);
  },

  orderbyDueDateAsc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareDateAsc);
    this.lastSort = arraySorted
    this.reloadListTask(arraySorted);
  },

  orderbyDueDateDesc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareDateDesc);
    this.lastSort = arraySorted
    this.reloadListTask(arraySorted);
  },

  orderbyCreateDateAsc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareCreateDateAsc);
    this.lastSort = arraySorted
    this.reloadListTask(arraySorted);
  },

  orderbyCreateDateDesc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compareCreateDateDesc);
    this.lastSort = arraySorted
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
