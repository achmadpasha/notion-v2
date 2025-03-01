class NoteList extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {}
} 
customElements.define('note-list', NoteList);

class NoteItem extends HTMLElement {
  constructor() {
    super();
    
    this.render();
  }
  render() {}
}
customElements.define('note-item', NoteItem);
