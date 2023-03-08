import Element from "../Element.js";

export default class Tab extends Element {
    _tab = null;
    
    constructor(tabId, panelId, tabTitle) {
        super();
        const config = { tabId, panelId, tabTitle };
        this.#initialize(config);
    }

    #initialize(config) {
        this._tab = this._createNode(config);
        this._tab.classList.add('tab-wrapper');
    }

    _renderTpl({ tabId, panelId, tabTitle }) {
        return `
            <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
                ${tabTitle}
            </button>
        `;
    }

    _getEl() {
        return this._tab;
    }

    getNode() {
        return this._tab;
    }

    _updateState(isSelected) {
        this._getEl().setAttribute('aria-selected', isSelected);
        if (isSelected) this.getNode().classList.add('selected');
        else this.getNode().classList.remove('selected');
    }
}