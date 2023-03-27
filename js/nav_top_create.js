let activeBoard = document.querySelector('.board_box_active');
let activeMainBlock = document.querySelector('.main_block_active');
let boardsMap = new Map();
boardsMap.set(activeBoard, activeMainBlock);


const closeModal = () => { 
  const modals = document.querySelectorAll('.modal')
  if (!modals) {return;}
  modals.forEach(el => {
    el.addEventListener('click', e => {

      if (!e.target.closest('.modal__body')) { 
        el.classList.remove('modal_active');
      }
    });
  });
}
closeModal();

let taskMap = new Map();


let addTaskBtn = document.querySelector('.addTask');
addTaskBtn.addEventListener('click', function(e){
  let modal = document.querySelector('.modal');
  if (!modal) {
    return;
  }
  modal.classList.add('modal_active');
});

//добавить/удалить саб таск
let columnsSubTask = document.querySelector('#subTasks');
let addNewSubtask = document.querySelector('.addNewSubtask');
addNewSubtask.addEventListener('click', function() {
  let subTaskPlace = document.querySelector('#subTaskPlace');
  let divTask = `<div class="task_inp_flex">
  <input id="title" class="subtasks__input text_title_size inputs_value" required autocomplete="on" type="text" name="title" placeholder="e.g. Make coffee" value="">
  <?xml version="1.0" ?>
  <svg class="task_remove_svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs>
  <style></style></defs><title/><g id="cross">
  <line class="cls-1" x1="7" x2="25" y1="7" y2="25"/>
  <line class="cls-1" x1="7" x2="25" y1="25" y2="7"/></g></svg></div>`;
  subTaskPlace.insertAdjacentHTML("beforebegin", divTask);

  let subTaskDiv = columnsSubTask.querySelectorAll('.task_inp_flex');
  let count = 0;
  for (let subTaskRemove of columnsSubTask.querySelectorAll('.task_remove_svg')){
    let div = subTaskDiv.item(count);
    subTaskRemove.addEventListener('mousedown', function(event) {
      if (event.button == 0) {
        div.remove();
      }
    });
    count++;
  }
});
 

let createTaskSubmitBtn = document.querySelector('.CreateTask');
createTaskSubmitBtn.addEventListener('click', function(e) {
  let currentMainBlock = document.querySelector('.main_block_active');
  let zametkiColumns = currentMainBlock.querySelectorAll('.flex_task_columns');

  //modal_info
  let form = document.querySelector('#form');
  let inputs = form.querySelectorAll('.inputs_value');

  //проверка на валидность inputs
  for(let input_elem of inputs){
    if(input_elem.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length == 0){
      input_elem.classList.add('input_invalid');
      input_elem.focus();
      input_elem.value = '';
      return;
    }
  }

  let taskPlace = currentMainBlock.querySelector('#taskAndColumnPlace');
  //инфа куда что вставлять из inputs
  let task_title = inputs[0].value;
  let task_description = inputs[1].value;
  let task_status_text = document.querySelector('.task_status_select').options[document.querySelector('.task_status_select').selectedIndex].text;
  let sub_task_count = document.querySelectorAll('.task_inp_flex').length;
  let sub_task_text = document.querySelectorAll('.task_inp_flex');

  //Конструктор лего нахуй
  let typeZametka = `<div id="${task_status_text}" class="flex_task_columns">
  <div class="task_name_wrapper">
  <div class="circle_task_status ${task_status_text}"></div>
  <div class="task_status_text">${task_status_text}</div>
  <div class="task_count">(1)</div>
  </div><div data-status="${task_status_text}" class="flex_task_inColumn">`;
  //сама заметка, на неё обработчики вешаться будут
  let zametkaDiv = `<div class="task">
  <div class="task_box_padding">
  <div class="main_task_text">${task_title}</div>
  <div class="sub_task_text">0 of ${sub_task_count} subtasks</div>
  </div>
  </div>`;

  if(zametkiColumns.length == 0){
    let taskDivZero = `${typeZametka} ${zametkaDiv} </div></div>`;
    taskPlace.insertAdjacentHTML("beforebegin", taskDivZero);
  }

  let breakCount = 0; //костыль, чтобы заметки не дюпались
  let zametkiColumns_array = Array.from(zametkiColumns);
  zametkiColumns_array.forEach((div, ind) => { //обход div'ов для поиска нужного column
    if(ind < breakCount){
      breakCount++;
      return;
    }
    
    if(div.id == task_status_text){
      let column = currentMainBlock.querySelector(`[data-status=${task_status_text}]`); //обёртка скролбар для тасков
      let task_columns = currentMainBlock.querySelector(`#${task_status_text}`) //сама колонка с тасками
      let lastZamentka = column.lastElementChild;
      lastZamentka.insertAdjacentHTML("afterend", zametkaDiv);
      task_columns.querySelector('.task_count').textContent = `(${column.querySelectorAll('.task').length})`;
      breakCount = ind + 2;
      return;
    }
    if(ind == zametkiColumns_array.length - 1){ //нет статуса
      let taskDivZero = `${typeZametka} ${zametkaDiv} </div>`;
      taskPlace.insertAdjacentHTML("beforebegin", taskDivZero);
      return;
    }
    else{
      return;
    }
  });

//Модальные окна для тасков

const tasksListElement = currentMainBlock.querySelector(`[data-status=${task_status_text}]`);
const taskElements = tasksListElement.querySelectorAll(`.task`);

  taskModal(task_title, task_description, sub_task_text, task_status_text);

  let currentTask = taskElements[taskElements.length - 1];
  let modal = document.querySelectorAll('.task_modal');
  let currentModalTask = modal[modal.length - 1];
  currentTask.addEventListener('click', function(e){
    if (!currentModalTask) {
      return;
    }
    e.preventDefault();
    currentModalTask.classList.add('task_modal_active');
});

closeTaskModal();

  if(sub_task_text != 0){
    let inpColumn = document.querySelectorAll('.my-checkbox');
    for(let checkbox of inpColumn){
      checkbox.addEventListener('click', checkboxCount);
    }
  }

//связываю: модальное окно -> блок таска
taskMap.set(currentModalTask, currentTask);
console.log(taskMap);

for (const task of taskElements) {
  task.draggable = true;
}
//Drag'n Drop
tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;
  return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();
  
  const activeElement = tasksListElement.querySelector(`.selected`);
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`task`);
    
  if (!isMoveable) {
    return;
  }
  
  const nextElement = getNextElement(evt.clientY, currentElement);
  
  if (
    nextElement && 
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return;
  }
    
  tasksListElement.insertBefore(activeElement, nextElement);
});



//when task created
//clear inp and close modalWindow
document.querySelector('.modal').classList.remove('modal_active');
for(let inp_value of inputs){
  if(inp_value.closest('.input_invalid')){
    inp_value.classList.remove('input_invalid');
  }
  inp_value.value = '';
}
//remove subTask divs
for(let sub of document.querySelectorAll('.task_inp_flex')){
  if(document.querySelectorAll('.task_inp_flex').length > 0){
    sub.remove();
  }
}
e.preventDefault();
});


const closeTaskModal = () => { 
  const taskModals = document.querySelectorAll('.task_modal');
  if (!taskModals) {return;}
  taskModals.forEach(el => {
    el.addEventListener('click', e => {
      if (!e.target.closest('.task_modal__body')) { 
        el.classList.remove('task_modal_active');
      }
    });
  });
}

function taskModal(title, description, subtask, status) {
  let taskModalPlace = document.querySelector('.modal');
 let partOne = `<div class="task_modal">
  <div class="task_modal__wrapper">
    <div class="task_modal__body">
      <div class="task_modal__inner">
        <div class="task_inf_title_flex">
          <div class="task_inf_title">
            ${title}
          </div>
          <div class="overlayDiv">
          <div class="taskInstrumental">
            <div class="taskInstrumental_inner">
            <div class="delete_flex">
            
            <svg class="delete_svg" height="137px" style="enable-background:new 0 0 98 137;" version="1.1" viewBox="0 0 98 137" width="98px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
<![CDATA[
  .st0{fill:#EF3E42;}
  .st1{fill:#FFFFFF;}
  .st2{fill:none;}
  .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
]]>
</style><defs/><path d="M75.6,44.8v73c0,3.4-2.8,6.2-6.2,6.2H21.3c-3.4,0-6.2-2.8-6.2-6.2v-73H75.6L75.6,44.8z M59.9,52.9v62.8h3.6V52.9H59.9 
 L59.9,52.9z M43.6,52.9v62.8h3.6V52.9H43.6L43.6,52.9z M27.3,52.9v62.8h3.6V52.9H27.3L27.3,52.9z M31.3,27.9v-5.2 
  c0-3.3,2.6-5.9,5.9-5.9h16.4c3.3,0,5.9,2.6,5.9,5.9v5.2h18.1c3.4,0,6.2,2.8,6.2,6.2v4.3H7V34c0-3.4,2.8-6.2,6.2-6.2H31.3L31.3,27.9z  
   M37.2,20.8c-1,0-1.8,0.8-1.8,1.8v5.2h20.1v-5.2c0-1-0.8-1.8-1.8-1.8H37.2L37.2,20.8z"/><rect class="st2" height="137" id="_x3C_Slice_x3E__100_" 
   width="98"/></svg> <div class="delete_task_text">Delete Task</div>
   </div>

   <div class="delete_subtask_flex">
<svg class="delete_svg" height="137px" style="enable-background:new 0 0 98 137;" version="1.1" viewBox="0 0 98 137" width="98px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
<![CDATA[
  .st0{fill:#EF3E42;}
  .st1{fill:#FFFFFF;}
  .st2{fill:none;}
  .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
]]>
</style><defs/><path d="M75.6,44.8v73c0,3.4-2.8,6.2-6.2,6.2H21.3c-3.4,0-6.2-2.8-6.2-6.2v-73H75.6L75.6,44.8z M59.9,52.9v62.8h3.6V52.9H59.9 
 L59.9,52.9z M43.6,52.9v62.8h3.6V52.9H43.6L43.6,52.9z M27.3,52.9v62.8h3.6V52.9H27.3L27.3,52.9z M31.3,27.9v-5.2 
  c0-3.3,2.6-5.9,5.9-5.9h16.4c3.3,0,5.9,2.6,5.9,5.9v5.2h18.1c3.4,0,6.2,2.8,6.2,6.2v4.3H7V34c0-3.4,2.8-6.2,6.2-6.2H31.3L31.3,27.9z  
   M37.2,20.8c-1,0-1.8,0.8-1.8,1.8v5.2h20.1v-5.2c0-1-0.8-1.8-1.8-1.8H37.2L37.2,20.8z"/><rect class="st2" height="137" id="_x3C_Slice_x3E__100_" 
   width="98"/></svg>
   <div class="delete_task_text">Delete Subtask</div>
   </div>
            

            </div>

            </div>
            <svg class="top_svg" id="Flat" height="0px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path d="M144,192a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,144,192ZM128,80a16,16,0,1,0-16-16A16.01833,16.01833,0,0,0,128,80Zm0,32a16,16,0,1,0,16,16A16.01833,16.01833,0,0,0,128,112Z"/>
            </svg>

          </div>
        </div>
        
        <div class="description_inf">
          ${description}
        </div>`;
  let partTwo;
  let partThree = `<div class="modal_task_status">
              <label class="text-field__label" for="status">Status</label>
              <select class="modal_task_status_select">
                <option value="Todo">Todo</option>
                <option value="Doing" selected>Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>

      </div>
    </div>
  </div>
</div>`;
  if(subtask.length != 0){
    partTwo = `<div class="subTasks_inf">
          <div class="subTasks_inf_title">Subtasks (0 of ${subtask.length})</div>
          <div class="flex_chekbox_subtasks_inf">`;
    for(let i = 0; i < subtask.length; i++){
      partTwo += `<div class="subTasks_inf_box">
              <input type="checkbox" class="my-checkbox"> <label class="modal_inf_subtask_label">${subtask[i].querySelector('.inputs_value').value}</label>
            </div>`;
    }
    let modalTaskDiv = `${partOne} ${partTwo} </div>
        </div> ${partThree}`;
    taskModalPlace.insertAdjacentHTML("beforebegin", modalTaskDiv);
  }
  else{
  
    let modalTaskDiv = `${partOne} ${partThree}`;
    taskModalPlace.insertAdjacentHTML("beforebegin", modalTaskDiv);
  }
  
  //три точки, показать удаление таска/сабтасков
  //нужно собрать все и назначит эту функция, в функции реализовать функцию удаления
  //в фун-ии удаления нужно удалять из Map таск и удалять его с html
  let overlay_Div = document.querySelector(".overlayDiv");
  overlay_Div.addEventListener('click', () => {
    let el = document.querySelector('.taskInstrumental');
    el.classList.toggle('taskInstrumental_visible');
  });
}

function checkboxCount() {
  let flex_checkbox = findAncestor(this, 'subTasks_inf');
  let divModal = findAncestor(this, 'task_modal');
  let divTask = taskMap.get(divModal);
  let chekboxColumn = divModal.querySelectorAll('.my-checkbox');
  let count = 0;
  for(let inp of chekboxColumn){
    if(inp.checked){
      count++;
    }
  }
  flex_checkbox.querySelector('.subTasks_inf_title').textContent = `Subtasks (${count} of ${chekboxColumn.length})`;
  divTask.querySelector('.sub_task_text').textContent = `${count} of ${chekboxColumn.length} subtasks`;
}

//найти главного родителя
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

//Create New Board

const closeBoardModal = () => { 
  const modals = document.querySelectorAll('.board_modal')
  if (!modals) {return;}
  modals.forEach(el => {
    el.addEventListener('click', e => {

      if (!e.target.closest('.board_modal__body')) { 
        el.classList.remove('board_modal_active');
      }
    });
  });
}
closeBoardModal();

let openBoardModalWindow = document.querySelector('#sidebar_createPapka');
openBoardModalWindow.addEventListener('click', function() {
  let boardModalWindow = document.querySelector('.board_modal');
  boardModalWindow.classList.add('board_modal_active');
});

let createNewBoard = document.querySelector('.createNewBoard');
createNewBoard.addEventListener('click', function() {
  let inpPapkaName = document.querySelector('#boardName');
  let papkaName = inpPapkaName.value;
  if(inpPapkaName.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length == 0){
      inpPapkaName.classList.add('input_invalid');
      inpPapkaName.focus();
      inpPapkaName.value = '';
      return;
    }
  createBoardAndMainBlock(papkaName);
  let boardModalWindow = document.querySelector('.board_modal');
  boardModalWindow.classList.remove('board_modal_active');
  inpPapkaName.value = '';
});

function currentBoard() {
  let activePapka = document.querySelector('.board_box_active');
  let activeBoard = boardsMap.get(activePapka);
  
  activePapka.classList.remove('board_box_active');
  activePapka.querySelector('.sidebar_papka_svg').classList.remove('sidebar_papka_svg_active');
  activeBoard.classList.remove('main_block_active')
  activeBoard.classList.add('main_block_none');

  let currentBoard = boardsMap.get(this);
  currentBoard.classList.remove('main_block_none');
  currentBoard.classList.add('main_block_active');
  this.classList.add('board_box_active');
  this.querySelector('.sidebar_papka_svg').classList.add('sidebar_papka_svg_active');
}

function createBoardAndMainBlock(papkaName) {
  let gridPlace = document.querySelectorAll('.grid_box3');
  let lastGridPlace = gridPlace[gridPlace.length - 1];
  let sidebarPlace = document.querySelector('#sidebar_createPapka');
  let board = `<div class="main_block main_block_none grid_box3">
  <div class="wrapper_main_block">
  <div class="flex_task_box">
  <div id="taskAndColumnPlace"></div> </div>
  </div>`;
  let sidebarBoard = `<div class="board_box papka">
          <div><svg class="sidebar_papka_svg" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  fill-rule="evenodd" clip-rule="evenodd" d="M25.9707 17H39C39.5523 17 40 17.4477 40 18V36C40 36.5523 39.5523 37 39 37H9C8.44772 37 8 36.5523 8 36V12C8 11.4477 8.44772 11 9 11H22.0825C22.4473 11 22.7832 11.1987 22.9589 11.5184L24.7117 10.5554C24.1847 9.59609 23.177 9 22.0825 9H9C7.34315 9 6 10.3431 6 12V36C6 37.6569 7.34315 39 9 39H39C40.6569 39 42 37.6569 42 36V18C42 16.3431 40.6569 15 39 15H27.1538L24.7117 10.5554L22.9589 11.5184L25.9707 17Z" />
            <path  fill-rule="evenodd" clip-rule="evenodd" d="M8 15H27.5V17H8V15Z" />
          </svg>
        </div>

        <div class="sidebar_papka_name">${papkaName}</div>
      </div>`;
  lastGridPlace.insertAdjacentHTML("afterend", board);
  sidebarPlace.insertAdjacentHTML("beforebegin", sidebarBoard);

  let nodesBoards = document.querySelectorAll('.papka');
  let lastBoard = nodesBoards[nodesBoards.length - 1];
  let nodesMainBlocks = document.querySelectorAll('.main_block_none');
  let lastMainBlock = nodesMainBlocks[nodesMainBlocks.length - 1];
  boardsMap.set(lastBoard, lastMainBlock); //записываем в коллекцию |папка : блок| для неё

  let papkaColumn = document.querySelectorAll('.papka');
  for(let papka of papkaColumn){
    papka.addEventListener('click', currentBoard);
  }

  if(document.querySelector('.sidebar').offsetWidth < 150){
   let papki = document.querySelectorAll('.sidebar_papka_name');
    for(let text of papki){
        text.style.display = "none";
    }
  }
  let countPapka = nodesBoards.length;
  document.querySelector('.sidebar_AllBoards_text').textContent = `All Boards (${countPapka})`; //All boards (count)
    if(document.querySelector('#boardName').closest('.input_invalid')){
      document.querySelector('#boardName').classList.remove('input_invalid');
    }
}

// удаление таска, перемещение в другую колонку

// function deleteTask() {
//   let 
// }