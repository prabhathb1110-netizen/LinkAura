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

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showMessage('');

  const title = input.value.trim();
  if (!title) return;

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Could not add task');
    }
    input.value = '';
    loadTasks();
  } catch (err) {
    showMessage(err.message);
  }
});

list.addEventListener('click', async (e) => {
  const li = e.target.closest('li');
  if (!li || !li.dataset.id) return;
  const id = li.dataset.id;

  try {
    if (e.target.classList.contains('delete')) {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
    } else {
      await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !li.classList.contains('done') })
      });
    }
    loadTasks();
  } catch {
    showMessage('Something went wrong.');
  }
});
