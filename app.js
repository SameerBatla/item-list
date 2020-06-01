const myInput = document.querySelector('#task');
const myForm = document.getElementById('task-form');
const myList = document.querySelector('.collection');
const filterItem = document.querySelector('#filter');
const clearItems = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', showItem);
  myForm.addEventListener('submit', addItem);
  myList.addEventListener('click', deleteItem);
  filterItem.addEventListener('keyup', filter);
  clearItems.addEventListener('click', clearAll);
}

function showItem() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    myList.appendChild(li);
  });
}

function addItem(e) {
  if (myInput.value === '') {
    alert('enter something');
  } else {
    const li = document.createElement('li');
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(myInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    myList.appendChild(li);
    storeToLocalStorage(myInput.value);
    myInput.value = '';
  }
  e.preventDefault();
}

function storeToLocalStorage(myValue) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(myValue);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteItem(e) {
  if (e.target.classList.contains('fa-remove')) {
    e.target.parentElement.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeFromLocalStorage(item) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) => {
    if (task === item.textContent) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filter(e) {
  const text = e.target.value;
  document.querySelectorAll('.collection-item').forEach((item) => {
    const task = item.textContent;
    if (task.toLowerCase().indexOf(text) === -1) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
    }
  });
}

function clearAll() {
  myList.innerHTML = '';
  clearLocalStorage();
}

function clearLocalStorage() {
  localStorage.clear();
}
