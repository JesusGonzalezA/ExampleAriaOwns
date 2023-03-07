import Element from "../Element.js";

export default class Panel extends Element {
    #panel = null;

    constructor(panelId, tabId, panelParagraph) {
        super();
        const config = { panelId, tabId, panelParagraph };
        this.#initialize(config);
    }

    _renderTpl({ panelId, tabId, panelParagraph }) {
        return `
            <div id="${panelId}" aria-labelledby="${tabId}" role="tabpanel" tabindex="0">
                <p>${panelParagraph}</p>
            </div>
        `;
    }

    #initialize(config) {
        this.#panel = this._createNode(config);
    }

    getNode() {
        return this.#panel;
    }

    setVisibility(show) {
        this.#panel.style.setProperty('display', show ? 'block' : 'none');
    }
}