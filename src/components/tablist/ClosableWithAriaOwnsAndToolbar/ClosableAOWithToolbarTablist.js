import ClosableTabList from "../Closable/ClosableTabList.js";
import ClosableAOWithToolbarTab from "./ClosableAOWithToolbarTab.js";

export default class ClosableAOWithToolbarTabList extends ClosableTabList {
    _createTab(tabId, panelId, tabTitle) {
        return new ClosableAOWithToolbarTab(tabId, panelId, tabTitle);
    }

    _renderTabList() {
      super._renderTabList();
      this._tablistWrapperDom.removeAttribute('role');
      this.#updateAriaOwns();
    }

    #updateAriaOwns() {
      const closeButtonIdArr = this._tabs.map(tab => tab.getCloseButtonEl().id);
      const toolbarAriaOwns = [...closeButtonIdArr].join(' ');
      const toolbarNode = document.createElement('div');
      const tablistWrapperDomWithAriaOwns = document.createElement('div');

      const toolbarId = `${this._anchorDom.id}_toolbar`
      toolbarNode.setAttribute('id', toolbarId);
      toolbarNode.setAttribute('role', 'toolbar');
      toolbarNode.setAttribute('aria-owns', toolbarAriaOwns);

      const tabIdArr = this._tabs.map(tab => tab._getEl().id);
      const tablistAriaOwns = [...tabIdArr].join(' ');
      tablistWrapperDomWithAriaOwns.setAttribute('role', 'tablist');
      tablistWrapperDomWithAriaOwns.setAttribute('aria-owns', tablistAriaOwns);

      this._anchorDom.appendChild(tablistWrapperDomWithAriaOwns);
      this._anchorDom.appendChild(toolbarNode);
    }
}