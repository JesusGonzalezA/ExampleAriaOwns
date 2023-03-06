import Tablist from "./tablist.js";

export default class ClosableTabList extends Tablist {
    _createTab(tabId, panelId, tabTitle) {
      return `
        <div style="display: inline-block; margin-right: 10px;">
          <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
            ${tabTitle}
          </button>
          <button class="close-tab-button">
            X
          </button>
        </div>
      `;
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

    _updateTabSelectedState(tab, isSelected) {
      tab.setAttribute('aria-selected', isSelected);
    }

    _addTabEvents(index) {
      const tabWrapper = this._tabs[index];
      const tab = this._getTabFromTabNode(tabWrapper);
      const closableButtonNode = this.#getClosableButtonFromTabWrapper(tabWrapper);
      tab.onclick = () => this.setActiveTab(index);
      closableButtonNode.onclick = () => this.#removeTab(index);
    }

    _getTabFromTabNode(tabNode) {
      return tabNode.querySelector("[role='tab']");
    }

    #getClosableButtonFromTabWrapper(tabWrapper) {
      return tabWrapper.querySelector('.close-tab-button');
    }
}