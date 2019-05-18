// const tasks = document.getElementsByClassName("task-item")

// function changeState() {
//   this.classList.toggle("active")
// }

// for( let i = 0; i < tasks.length; i++){
//   tasks[i].add-EventListener("click", changeState )
// }

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
    // resultSorted = this.orderbyTaskTitleDesc(result);
    this.reloadListTask(result);
  },

  reloadListTask: function(arrayTask) {
    const $taskList = document.getElementById("js-task-list");
    let htmlTasks = "";
    arrayTask.forEach(function(val) {
      htmlTasks += `<li class="task-item ${val.resolved ? "active" : ""}"> ${
        val.title
      }</li>`;
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

  getSelectedValue: function() {
    var selectedValue = document.getElementById("select_id").value;
    console.log(selectedValue);
  },

  orderbyTaskTitleAsc: function() {
    let arrayTask = Object.values(this.tasks);
    const arraySorted = arrayTask.sort(this.compare);
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
