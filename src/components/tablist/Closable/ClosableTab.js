import Tab from "../Tab.js";

export default class ClosableTab extends Tab {
    _renderTpl({ tabId, panelId, tabTitle }) {
        return `
            <div class="closable-tab">
                <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
                    ${tabTitle}
                </button>
                <button id="${tabId}_closable_button" class="close-tab-button">
                    X
                </button>
            </div>
        `;
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