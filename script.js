const tasks = document.getElementsByClassName("task-item")

function changeState() {
  this.classList.toggle("active")
}

for( let i = 0; i < tasks.length; i++){
  tasks[i].addEventListener("click", changeState )
}