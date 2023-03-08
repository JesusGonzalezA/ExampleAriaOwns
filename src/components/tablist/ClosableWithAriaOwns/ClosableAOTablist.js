import ClosableTabList from "../Closable/ClosableTabList.js";
import ClosableAOTab from "./ClosableAOTab.js";

export default class ClosableAOTabList extends ClosableTabList {
    _createTab(tabId, panelId, tabTitle) {
        return new ClosableAOTab(tabId, panelId, tabTitle);
    }

    _renderTabList() {
      super._renderTabList();
      this.#updateAriaOwns();
    }

    #updateAriaOwns() {
      const tabIdArr = this._tabs.map(tab => tab._getEl().id);
      const closeButtonIdArr = this._tabs.map(tab => tab.getCloseButtonEl().id);
      
      const ariaOwns = [...tabIdArr, ...closeButtonIdArr].join(' ');
      this._tablistWrapperDom.setAttribute('aria-owns', ariaOwns);
    }
}