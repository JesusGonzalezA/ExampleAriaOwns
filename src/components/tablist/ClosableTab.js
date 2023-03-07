import Tab from "./Tab.js";

export default class ClosableTab extends Tab {

    constructor(tabId, panelId, tabTitle) {
        super();
        this._renderTpl = `
            <div style="display: inline-block; margin-right: 10px;">
                <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
                    ${tabTitle}
                </button>
                <button class="close-tab-button">
                    X
                </button>
            </div>
        `;
        this.#initialize();
    }

    #initialize() {
        this._tab = this._createNode();
    }

    _getEl() {
        return this._tab.querySelector("[role='tab']");
    }

    getCloseButtonEl() {
        return this._tab.querySelector('.close-tab-button');
    }

    _updateState(isSelected) {
        this._getEl().setAttribute('aria-selected', isSelected);
    }
}