import Element from "../Element.js";

export default class Panel extends Element {
    #panel = null;

    constructor(panelId, tabId, panelParagraph) {
        super();
        this._renderTpl = `
            <div id="${panelId}" aria-labelledby="${tabId}" role="tabpanel" tabindex="0">
                <p>${panelParagraph}</p>
            </div>
        `;
        this.#initialize();
    }

    #initialize() {
        this.#panel = this._createNode();
    }

    getNode() {
        return this.#panel;
    }

    setVisibility(show) {
        this.#panel.style.setProperty('display', show ? 'block' : 'none');
    }
}