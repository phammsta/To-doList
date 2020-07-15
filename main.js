let todoList = []
var doneButton = document.getElementById("showdone");
var unDoneButton = document.getElementById("showundone");
var showAllButton = document.getElementById("showall");


const addTodo = () => {
  let todo = document.getElementById("todoInput").value

  let itemTodo = { contents: todo, complete: false, }
  document.getElementById('todoInput').value = ``
  todoList.push(itemTodo)
  localStorage.setItem('todoList',JSON.stringify(todoList))
  render(todoList)

}

const toggleDone = (index) => {
  // if(todoList[index].complete == true){
  //      todoList[index].complete = false
  // }else if(todoList[index].complete == false){
  //     todoList[index].complete = true
  // }

  todoList[index].complete = !todoList[index].complete
  localStorage.setItem('todoList',JSON.stringify(todoList))
  showAllButton.classList.add("highlight");
  doneButton.classList.remove("highlight");
  unDoneButton.classList.remove("highlight");
  render(todoList)
}

const render = (array) => {
  let todoHTML = array
    .map((item, index) => {
      let html = "";
      if (item.complete == false) {
        html += `<div class="item-style list">${item.contents} <a onclick="toggleDone(${index})" href="#">✓</a>`;
      } else {
        html += `<div class="item-style list"><strike>${item.contents}</strike> <a onclick="toggleDone(${index})" href="#">↻</a>`;
      }
      html += `<a class="end" href='#' onclick='remove(${index})'>⌫</a></div>`;
      return html
    })
    .join("");
  document.getElementById("resultArea").innerHTML = todoHTML;
  
};


const remove = (index) => {
  todoList.splice(index, 1)
  localStorage.setItem('todoList',JSON.stringify(todoList))
  render(todoList)
}


let enter = document.getElementById("todoInput")
enter.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    addTodo();
  }

});

const showDone = () => {
  let doneList = todoList.filter(item => item.complete === true)
  doneButton.classList.add("highlight");
  unDoneButton.classList.remove("highlight");
  showAllButton.classList.remove("highlight");
  render(doneList)
}

const showUndone = () => {
  let undoneList = todoList.filter(item => item.complete === false)
  unDoneButton.classList.add("highlight");
  doneButton.classList.remove("highlight");
  showAllButton.classList.remove("highlight");
  render(undoneList)
}

const showAll = () => {
  render(todoList)
  showAllButton.classList.add("highlight");
  doneButton.classList.remove("highlight");
  unDoneButton.classList.remove("highlight");
}

const initialize = () => {
  let dataFromLocalStorage = JSON.parse(localStorage.getItem('todoList'))
  render(dataFromLocalStorage)
  todoList = dataFromLocalStorage
} 

initialize()