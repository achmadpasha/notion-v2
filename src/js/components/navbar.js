class NavBar extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('class', 'container flex justify-between items-center h-[72px] mx-auto p-5');
    
    this.render();
  }
  render() {}
} 
customElements.define('nav-bar', NavBar);

class NavLeft extends HTMLElement {
  constructor() {
    super();
    
    this.render();
  }
  render() {}
}
customElements.define('nav-left', NavLeft);


class NavRight extends HTMLElement {
  constructor() {
    super();
    
    this.render();
  }
  render() {}
}
customElements.define('nav-right', NavRight);
