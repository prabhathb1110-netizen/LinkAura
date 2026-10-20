const API = '/api/tasks';
const list = document.getElementById('task-list');
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const message = document.getElementById('message');

function showMessage(text) {
  message.textContent = text;
}

function renderTasks(tasks) {
  list.innerHTML = '';

  if (tasks.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No tasks yet. Add one above!';
    list.appendChild(li);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.dataset.id = task._id;
    if (task.done) li.classList.add('done');

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = task.title;

    const del = document.createElement('button');
    del.className = 'delete';
    del.textContent = 'Delete';

    li.append(title, del);
    list.appendChild(li);
  });
}

async function loadTasks() {
  try {
    const res = await fetch(API);
    renderTasks(await res.json());
  } catch {
    showMessage('Could not load tasks.');
  }
}

loadTasks();
