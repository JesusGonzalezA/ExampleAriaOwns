import ClosableTab from "./ClosableTab.js";
import Tablist from "../tablist.js";

export default class ClosableTabList extends Tablist {
    
    _createTab(tabId, panelId, tabTitle) {
      return new ClosableTab(tabId, panelId, tabTitle);
    }
  
    #removeTab(index) {
      this._tabs.splice(index, 1);
      this._panels.splice(index, 1);
      this._activeTabIndex = this.#getIndexAfterRemoving(index);
      this._reRender(); 
    }

    #getIndexAfterRemoving(index) {
      const tabsLength = this._tabs.length;

      if(index == tabsLength) 
        return tabsLength - 1;
      if(tabsLength == 0) 
        return -1;

      return index;
    }

    _addTabEvents(index) {
      super._addTabEvents(index);
      const tab = this._tabs[index];
      tab.getCloseButtonEl().onclick = () => this.#removeTab(index);
    }
}