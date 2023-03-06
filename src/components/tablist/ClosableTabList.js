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
      const tabsLength = this._getTabs().length;

      if(index == tabsLength) 
        return tabsLength - 1;
      if(tabsLength == 0) 
        return -1;

      return index;
    }

    _addTabEvents(index) {
      const tabNode = this._getTabs()[index];
      const closableButtonNode = tabNode.querySelector('.close-tab-button');
      tabNode.onclick = () => this.setActiveTab(index);
      closableButtonNode.onclick = () => this.#removeTab(index);
    }

    _getTabs() {
      return this._tabs.filter(tab => tab.querySelector("[role='tab']"));
    }
}