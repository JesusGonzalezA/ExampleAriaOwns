import Tablist from "./tablist.js";

export default class ClosableTabList extends Tablist {
    _createTab(tabId, panelId, tabTitle, index) {
      return `
        <div id="${index}" style="display: inline-block; margin-right: 10px;">
          <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
            ${tabTitle}
          </button>
          <button class="close-tab-button" data-index="${index}">
            X
          </button>
        </div>
      `;
    }
  
    _addButtonEvents(index) {
      const closeButton = this._tabs[index].querySelector('.close-tab-button');
      closeButton.addEventListener('click', () => {
        this.removeTab(index);
        this.setActiveTab(index+1);
      });
    }
  
    removeTab(index) {
      this._tabs.splice(index, 1);
      this._panels.splice(index, 1);
    }

    addTab(tabTitle, panelParagraph) {
        const index = this._tabs.length;
        const tabId = `${this._anchorDom.id}_tab${index}`;
        const panelId = `${this._anchorDom.id}_panel${index}`
        
        const tab = this._createTab(tabId, panelId, tabTitle,index);
        const panel = this._createPanel(panelId, tabId, panelParagraph);

        const tabNode = new DOMParser().parseFromString(tab, "text/html").body.firstElementChild;
        const panelNode = new DOMParser().parseFromString(panel, "text/html").body.firstElementChild;
        
        this._tabs.push(tabNode);
        this._panels.push(panelNode);
        this._addTabEvents(index);
        this._addButtonEvents(index);
        //AddTabEvents is called last with index=0 so the active tab is set to the index 0 and that tab is not visible anymore
    }
}