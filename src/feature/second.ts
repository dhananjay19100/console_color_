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
  `;

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  handleEvent(event: Event) {
    console.log(`Custom element received event: ${event.type}`);
    const customEvent = new CustomEvent('custom-event', {
      detail: { eventName: event.type },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  }
}

customElements.define('nxg-highlight-text', MyCustomElement);
