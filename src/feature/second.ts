import { html, css, LitElement } from 'lit';

class MyCustomElement extends LitElement {
  constructor() {
    super();
    // Initialize any necessary setup here.
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleEvent);
    this.addEventListener('mouseup', this.handleEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleEvent);
    this.removeEventListener('mouseup', this.handleEvent);
  }

  static styles = css`
    /* Your component's CSS styles */
  `;

  render() {
    return html`
      <!-- Your component's HTML template -->
      <div>
        <slot></slot>
      </div>
    `;
  }

  handleEvent(event: Event) {
    // Handle the events internally
    console.log(`Custom element received event: ${event.type}`);
    // Dispatch a custom event if needed
    const customEvent = new CustomEvent('custom-event', {
      detail: { eventName: event.type },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  }
}

customElements.define('my-custom-element', MyCustomElement);
export {MyCustomElement}