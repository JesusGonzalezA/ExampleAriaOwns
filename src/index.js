class Tablist {
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
    
    #initialize() {
        this.setActiveTab();
    }

    addArrowNavigation(event, index) {
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

    addTab(tabTitle, panelParagraph) {
        const index = this.#tabs.length;
        const tabId = `${this.#anchorDom.id}_tab${index}`;
        const panelId = `${this.#anchorDom.id}_panel${index}`
        
        const tab = `
            <button id="${tabId}" aria-controls="${panelId}" role="tab" type="button" aria-selected="false">
                ${tabTitle}
            </button>
        `;
        const panel = `
            <div id="${panelId}" aria-labelledby="${tabId}" role="tabpanel" tabindex="0">
                <p>${panelParagraph}</p>
            </div>
        `;

        const tabNode = new DOMParser().parseFromString(tab, "text/html").body.firstElementChild;
        const panelNode = new DOMParser().parseFromString(panel, "text/html").body.firstElementChild;
        tabNode.onclick = () => this.setActiveTab(index);
        tabNode.onkeydown = (ev) => this.addArrowNavigation(ev, index);
        this.#tabs.push(tabNode);
        this.#panels.push(panelNode);
    }

    render() {
        this.#initialize();

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

class Director {
    constructTablist(builder, tablist) {
        builder.constructTablist(tablist);
    }
}

class HorizontalTablistBuilder {
    #tablist = null;

    #setTablist(tablist) {
        this.#tablist = tablist;
    }

    #getTablist() {
        if (!this.#tablist) throw new Error("Tablist is not initialized");
        return this.#tablist;
    }

    constructTablist(tablist) {
        this.#setTablist(tablist);
    }
}

window.addEventListener('load', () => {
    const director = new Director();
    const horizontalBur = new HorizontalTablistBuilder();

    const tablistHorizontalDom = document.getElementById('tablist1');
    const tablistHorizontal = new Tablist(tablistHorizontalDom);

    tablistHorizontal.addTab("Breakfast", "Coffee and milk");
    tablistHorizontal.addTab("Lunch","Lasagna");
    tablistHorizontal.addTab("Dinner","Fish and chips");
    tablistHorizontal.render();

    director.constructTablist(horizontalBuilder, tablistHorizontal);
});