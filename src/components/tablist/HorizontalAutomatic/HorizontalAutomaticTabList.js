import Tablist from "../tablist.js";
import HorizontalAutomaticTab from "./HorizontalAutomaticTab.js";

export default class HorizontalAutomaticTabList extends Tablist {
    _createTab(tabId, panelId, tabTitle) {
        return new HorizontalAutomaticTab(tabId, panelId, tabTitle);
    }

    _addTabEvents(index) {
        super._addTabEvents(index);
        const tab = this._tabs[index];
        tab._getEl().onkeydown = (ev) => this.#addArrowNavigation(ev, index);
    }

    #addArrowNavigation(event, index) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')
            return;

        event.preventDefault();

        let newIndex = index;
        if (event.key === 'ArrowRight') {
            newIndex = (index + 1) % this._tabs.length;
        } else if (event.key === 'ArrowLeft') {
            newIndex = (index - 1 + this._tabs.length) % this._tabs.length;
        }
        this.setActiveTab(newIndex);
        this._tabs[newIndex]._getEl().focus();
    }
}