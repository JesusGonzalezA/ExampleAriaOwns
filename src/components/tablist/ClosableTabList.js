import Tablist from "./tablist.js";

export default class ClosableTabList extends Tablist {
    _createTab(tabId, panelId, tabTitle) {
        return `
            <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
                ${tabTitle}
            </button>
        `;
    }
}