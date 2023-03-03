export default class Tablist {
    #tabs = [];
    #panels = [];
    #activeTabIndex = -1;
    #anchorDom = null;

    constructor(anchorDom) {
        this.#anchorDom = anchorDom;
    }

    setActiveTab(newActiveTabIndex = 0) {
        if (this.#tabs === [] || newActiveTabIndex >= this.#tabs.length || newActiveTabIndex < 0)
             return;

        this.#activeTabIndex = newActiveTabIndex; 
        this.#tabs.forEach((tab, index) => {
            tab.setAttribute('aria-selected', index === this.#activeTabIndex);
            tab.setAttribute('tabindex', (index == this.#activeTabIndex) ? 0 : -1);
        });
        this.#panels.forEach((panel, index) => panel.style.setProperty('display', (index === this.#activeTabIndex) ? 'block' : 'none'));
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
            newIndex = (index + 1) % this.#tabs.length;
        } else if (event.key === 'ArrowLeft') {
            newIndex = (index - 1 + this.#tabs.length) % this.#tabs.length;
        }

        this.setActiveTab(newIndex);
        this.#tabs[newIndex].focus();
    }

    #addTabEvents(index) {
        const tabNode = this.#tabs[index];

        tabNode.onclick = () => this.setActiveTab(index);
        tabNode.onkeydown = (ev) => this.#addArrowNavigation(ev, index);
    }

    _createTab(tabId, panelId, tabTitle) {
        return `
            <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
                ${tabTitle}
            </button>
        `;
    }

    #createPanel(panelId, tabId, panelParagraph) {
        return `
            <div id="${panelId}" aria-labelledby="${tabId}" role="tabpanel" tabindex="0">
                <p>${panelParagraph}</p>
            </div>
        `;
    }

    addTab(tabTitle, panelParagraph) {
        const index = this.#tabs.length;
        const tabId = `${this.#anchorDom.id}_tab${index}`;
        const panelId = `${this.#anchorDom.id}_panel${index}`
        
        const tab = this._createTab(tabId, panelId, tabTitle);
        const panel = this.#createPanel(panelId, tabId, panelParagraph);

        const tabNode = new DOMParser().parseFromString(tab, "text/html").body.firstElementChild;
        const panelNode = new DOMParser().parseFromString(panel, "text/html").body.firstElementChild;
        
        this.#tabs.push(tabNode);
        this.#panels.push(panelNode);
        this.#addTabEvents(index);
    }

    render() {
        this.#onBeforeRender();

        const tablistElement = document.createElement('div');
        tablistElement.setAttribute("role","tablist");
        this.#tabs.forEach((tab) => {
            tablistElement.appendChild(tab);
        });

        const panelElement = document.createElement('div');
        this.#panels.forEach((panel) => {
            panelElement.appendChild(panel);
        });

        this.#anchorDom.appendChild(tablistElement);
        this.#anchorDom.appendChild(panelElement);
    }
}