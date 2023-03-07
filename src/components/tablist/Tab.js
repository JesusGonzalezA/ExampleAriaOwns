import Element from "../Element.js";

export default class Tab extends Element {
    _tab = null;
    
    constructor(tabId, panelId, tabTitle) {
        super();
        this._renderTpl = `
            <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
                ${tabTitle}
            </button>
        `;
        this.#initialize();
    }

    #initialize() {
        this._tab = this._createNode();
    }

    _getEl() {
        return this._tab;
    }

    getNode() {
        return this._tab;
    }

    _updateState(isSelected) {
        this._getEl().setAttribute('aria-selected', isSelected);
        this._getEl().setAttribute('tabindex', (isSelected) ? 0 : -1);
    }
}