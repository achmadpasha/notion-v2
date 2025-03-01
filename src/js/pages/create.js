import '../components/navbar.js';
import '../components/loader.js';
import requestNotes from '../services/request.js';

const container = document.querySelector('main');
const form = document.querySelector('#form-notes');
const submit = document.querySelector('#submit');
const title = document.querySelector('#input-title');
const body = document.querySelector('#input-body');
const count = document.querySelector('#char-count');

// real-time validation (input title)
title.addEventListener('input', () => {
  count.innerText = `${title.value.length}/120`;
  if (title.value.length > 120) {
    submit.setAttribute('disabled', '');
    submit.classList.replace('text-gray-800', 'text-gray-300');
    submit.classList.remove('hover:bg-gray-200');
    count.classList.replace('text-gray-300', 'text-red-600');
  }
  else {
    submit.removeAttribute('disabled');
    submit.classList.replace('text-gray-300', 'text-gray-800');
    submit.classList.add('hover:bg-gray-200');
    count.classList.replace('text-red-600', 'text-gray-300');
  }
});

// get is-edit data
const isEdit = JSON.parse(localStorage.getItem('is-edit'));

const handleSubmit = async (event) => {
  event.preventDefault();
  // Ensure if title/body value not blank
  if (!title.value || !body.value) return alert('Please fill all the fields.');

  const requestBody = { title: title.value, body: body.value };

  // if isEdit true, delete the current notes
  if (isEdit) {
    const noteId = localStorage.getItem('note-page-id');
    await requestNotes(`/notes/${noteId}`, 'DELETE');
  }

  // post edited notes
  await requestNotes('/notes', 'POST', requestBody);
  // redirect to home page
  window.location.href = '../../notion/index.html';
};

const loadNote = async () => {
  if (!isEdit) return; // if isEdit false, return nothing
  // get current notes id
  const noteId = localStorage.getItem('note-page-id');
  form.setAttribute('class', 'hidden')
  // get current note data
  const { data: note } = await requestNotes(`/notes/${noteId}`, 'GET');
  container.setAttribute('class', 'container mx-auto p-5 pt-[100px] h-dvh max-h-dvh')
  form.setAttribute('class', 'flex flex-col h-full')
  // fill the input with current note data
  title.value = note.title;
  body.value = note.body;
  count.innerText = `${title.value.length}/120`;
};

// if form submitted, run handleSubmit function
form.addEventListener('submit', handleSubmit);
loadNote();
