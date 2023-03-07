import Tab from "./Tab.js";

export default class Tablist {
    _tabs = [];
    _panels = [];
    _activeTabIndex = -1;
    _anchorDom = null;

    constructor(anchorDom, newActiveTabIndex = 0) {
        this._anchorDom = anchorDom;
        this._activeTabIndex = newActiveTabIndex;
    }

    setActiveTab(newActiveTabIndex = this._activeTabIndex) {
        if (this._tabs === [] || newActiveTabIndex >= this._tabs.length || newActiveTabIndex < 0)
             return;
        this._activeTabIndex = newActiveTabIndex;
        this._tabs.forEach((tab, index) => {
            tab._updateState(index === this._activeTabIndex);
        });
        this._panels.forEach((panel, index) => panel.style.setProperty('display', (index === this._activeTabIndex) ? 'block' : 'none'));
    }
    
    #onBeforeRender() {
        this.setActiveTab();
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

    _addTabEvents(index) {
        const tab = this._tabs[index]._getEl();
        tab.onclick = () => this.setActiveTab(index);
        tab.onkeydown = (ev) => this.#addArrowNavigation(ev, index);
    }

    _createTab(tabId, panelId, tabTitle) {
        return new Tab(tabId, panelId, tabTitle);
    }

    _createPanel(panelId, tabId, panelParagraph) {
        return `
            <div id="${panelId}" aria-labelledby="${tabId}" role="tabpanel" tabindex="0">
                <p>${panelParagraph}</p>
            </div>
        `;
    }

    _getTabFromTabNode(tabNode) {
        return tabNode;
    }

    addTab(tabTitle, panelParagraph) {
        const index = this._tabs.length;
        const tabId = `${this._anchorDom.id}_tab${index}`;
        const panelId = `${this._anchorDom.id}_panel${index}`
        
        const tab = this._createTab(tabId, panelId, tabTitle);
        const panel = this._createPanel(panelId, tabId, panelParagraph);
        const panelNode = new DOMParser().parseFromString(panel, "text/html").body.firstElementChild;
        
        this._tabs.push(tab);
        this._panels.push(panelNode);
        this._addTabEvents(index);
    }

    render() {
        this.#onBeforeRender();

        const tablistElement = document.createElement('div');
        tablistElement.setAttribute("role","tablist");
        this._tabs.forEach((tab) => {
            tablistElement.appendChild(tab.getNode());
        });

        const panelElement = document.createElement('div');
        this._panels.forEach((panel) => {
            panelElement.appendChild(panel);
        });

        this._anchorDom.appendChild(tablistElement);
        this._anchorDom.appendChild(panelElement);
    }

    #reAttatchEvents() {
        this._tabs.forEach((_, index) => {
            this._addTabEvents(index);
        });
    }

    #unRender() {
        this._anchorDom.replaceChildren();
    }

    _reRender() {
        this.#unRender();
        this.#reAttatchEvents();
        this.render();
      }
}