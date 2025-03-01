class Loading extends HTMLElement {
  constructor() {
    super();
    
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="flex flex-col items-center gap-y-5">
        <div class="flex items-center gap-2">
          <span class="animate-ping inline-block size-3 bg-gray-900 rounded-full"></span>
          <span class="animate-ping inline-block size-3 bg-gray-900 rounded-full"></span>
          <span class="animate-ping inline-block size-3 bg-gray-900 rounded-full"></span>
        </div>
        <span class="text-gray-400 text-xs font-semibold md:text-sm">Please wait...</span>
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
} 
customElements.define('loading-ping', Loading);