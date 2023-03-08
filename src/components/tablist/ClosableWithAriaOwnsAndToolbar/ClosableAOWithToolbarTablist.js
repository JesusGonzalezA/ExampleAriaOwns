import ClosableTabList from "../Closable/ClosableTabList.js";
import ClosableAOWithToolbarTab from "./ClosableAOWithToolbarTab.js";

export default class ClosableAOWithToolbarTabList extends ClosableTabList {
    _createTab(tabId, panelId, tabTitle) {
        return new ClosableAOWithToolbarTab(tabId, panelId, tabTitle);
    }

    _renderTabList() {
      super._renderTabList();
      this.#updateAriaOwns();
    }

    #updateAriaOwns() {
      const closeButtonIdArr = this._tabs.map(tab => tab.getCloseButtonEl().id);
      const toolbarAriaOwns = [...closeButtonIdArr].join(' ');
      const toolbarNode = document.createElement('div');
      const toolbarId = `${this._anchorDom.id}_toolbar`
      this._anchorDom.appendChild(toolbarNode);
      toolbarNode.setAttribute('id', toolbarId);
      toolbarNode.setAttribute('role', 'toolbar');
      toolbarNode.setAttribute('aria-owns', toolbarAriaOwns);

      const tabIdArr = this._tabs.map(tab => tab._getEl().id);
      const tablistAriaOwns = [...tabIdArr, toolbarId].join(' ');
      this._tablistWrapperDom.setAttribute('aria-owns', tablistAriaOwns);
    }
}