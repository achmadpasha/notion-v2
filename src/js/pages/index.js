import '../components/navbar.js';
import '../components/notes.js';
import '../components/loader.js';
import { formatText } from '../utils.js';
import requestNotes from '../services/request.js';

const container = document.querySelector('main');
// get unarchived notes data
const response = await requestNotes('/notes', 'GET');
const data = response?.data;
let dataLength = data?.length;

// response message function
const responseMessage = (data) => {
  container.setAttribute('class', 'container mx-auto p-5 min-h-dvh flex justify-center items-center');
  const span = document.createElement('span');
  span.setAttribute('class', 'text-gray-400 font-semibold');
  span.innerText = data === undefined ? 'No internet connection' : 'No notes yet.';

  container.appendChild(span);
};

// if data undefined or data length 0, display message on the screen
if (data === undefined || data.length === 0) {responseMessage(data)}
else { // otherwise, display the notes
  const noteList = document.createElement('note-list');
  noteList.setAttribute('class', 'grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4');

  data.forEach((note) => {
    // create notes card
    const noteItem = document.createElement('note-item');
    noteItem.setAttribute('class', 'grid grid-cols-7 min-[580px]:grid-cols-8 bg-gray-100 rounded-xl shadowm-sm');
    const a = document.createElement('a');
    a.setAttribute('href', 'notes.html');
    a.setAttribute('class', 'col-span-6 min-[580px]:col-span-7 flex flex-col p-4 rounded-xl rounded-e-none transition-all duration-200 ease-out hover:bg-gray-200');
    a.innerHTML = `
      <h3 class="text-gray-800 text-sm font-semibold text-clamp-2 lg:text-base">${note.title}</h3>
      <p class="mt-1 text-gray-400 text-xs text-clamp-5 lg:text-sm">${formatText(note.body)}</p>
    `;

    // if notes clicked, send notes id on 'note-page-id' key
    a.onclick = () => {localStorage.setItem('note-page-id', note.id);};

    // create archive button on the notes
    const archive = document.createElement('button');
    archive.setAttribute('type', 'button');
    archive.setAttribute('title', 'Archive');
    archive.setAttribute('class', 'text-lg bg-gray-200 rounded-xl rounded-s-none transition-all duration-200 ease-out hover:bg-gray-300');
    archive.innerText = '📥';

    // if archive button clicked, archive the notes
    archive.onclick = async () => {
      await requestNotes(`/notes/${note.id}/archive`, 'POST');
      noteItem.setAttribute('class', 'hidden'); // hide the element
      dataLength--; // decrement data length
      // if data length 0, display message on the screen
      if (dataLength === 0) responseMessage(data);
    }

    noteItem.appendChild(a);
    noteItem.appendChild(archive);
    noteList.appendChild(noteItem);
  });

  container.appendChild(noteList);
}

// if create button clicked, send false data on 'is-edit' key
document.querySelector('#create').onclick = () => {
  localStorage.setItem('is-edit', false);
};
