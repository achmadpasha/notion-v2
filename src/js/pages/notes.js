import '../components/navbar.js';
import '../components/loader.js';
import { formatText } from '../utils/utils.js';
import requestNotes from '../services/request.js';

const title = document.querySelector('#title');
const body = document.querySelector('#body');
const edit = document.querySelector('#edit');
const archive = document.querySelector('#archive');
const del = document.querySelector('#delete');
const back = document.querySelector('#back');

// get selected notes id
const noteId = localStorage.getItem('note-page-id');
// get notes data
const response = await requestNotes(`/notes/${noteId}`, 'GET');
const data = response?.data;

// if data undefined or null, display message on the screen
if (data === undefined || data === null) {
  edit.setAttribute('class', 'hidden');
  del.setAttribute('class', 'hidden');

  const container = document.querySelector('main');
  const span = document.createElement('span');
  container.setAttribute('class', 'container mx-auto p-5 min-h-dvh flex justify-center items-center');
  span.setAttribute('class', 'text-gray-400 font-semibold');
  span.innerText = 'Notes not found.';

  container.appendChild(span);
} else { // otherwise, display the notes 
  title.innerText = data.title;
  body.innerHTML = formatText(data.body);

  // if edit button clicked, send 'true' data on 'is-edit' key
  edit.onclick = () => {localStorage.setItem('is-edit', true)};

  // if data archived equal to false
  if (data.archived === false) {
    // change the link on back button to home page
    back.setAttribute('href', '../index.html')
    archive.innerText = 'Archive';
    // if archive button clicked, archive the notes
    archive.onclick = async () => {
      await requestNotes(`/notes/${noteId}/archive`, 'POST');
    };
  } else { // otherwise
    // change the link on back button to archived page
    back.setAttribute('href', '../archived/index.html')
    archive.innerText = 'Unarchive';
    // if unarchived button clicked, unarchive the notes
    archive.onclick = async () => {
      await requestNotes(`/notes/${noteId}/unarchive`, 'POST');
    };
  }

  // if delete button clicked
  del.onclick = async (event) => {
    event.preventDefault();
    // show confirmation pop-up
    const isDelete = confirm('Are you sure?');

    // if user click 'OK', delete the notes
    if (isDelete) {
      await requestNotes(`/notes/${noteId}`, 'DELETE');
      // redirect to home page
      window.location.href = '../../notion/index.html';
    }
  };
}
