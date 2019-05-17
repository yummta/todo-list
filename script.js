// const tasks = document.getElementsByClassName("task-item")

// function changeState() {
//   this.classList.toggle("active")
// }

// for( let i = 0; i < tasks.length; i++){
//   tasks[i].add-EventListener("click", changeState )
// }



const app = {
  idIterator: null,

  tasks: {},

  addTask: function(task) {
    let idTask = this.idIterator.next().value
    this.tasks[idTask] = {
      id: idTask,
      title: task.title,
      dueDate: task.dueDate,
      createDate: Date(),
      priority: false,
      resolved: false
    }
    this.reloadListTask()
  },

  reloadListTask: function() {},

  toggleState: function() {},

  orderby: function() {},

  idGenerator: function*() {
    let id = 1
    while (true) {
      yield id;
      id++
    }
  },

  run: function () {
    this.idIterator = this.idGenerator()
  }

}

app.run()
