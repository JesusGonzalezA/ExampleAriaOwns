class Tablist {
    #tabs = [];
    #panels = [];

    constructor(tabs, panels, activeTabIndex = 0) {
        this.#tabs = tabs;
        this.#panels = panels;
        this.setActiveTab(activeTabIndex);
    }

    setActiveTab(newActiveTabIndex) {
        this.#tabs.forEach((tab, index) => tab.setAttribute('aria-selected', index === newActiveTabIndex));
        this.#panels.forEach((panel, index) => panel.style.setProperty('display', (index === newActiveTabIndex) ? 'block' : 'none'));
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

        this.#addTogglePanelFunctionality();
    }

    #addTogglePanelFunctionality() {
        return this;
    }
}

window.addEventListener('load', () => {
    const tablistsDom = document.querySelectorAll('[role=tablist]');
    tablistsDom.forEach(tablistDom => {
        const tabs = Array.from(tablistDom.querySelectorAll('[role=tab]')),
            panels = [];
        let activeTabIndex = 0;
        
        tabs.forEach((tab, index) => {
            if (tab.getAttribute('aria-selected') === 'true') 
                activeTabIndex = index;

            const idControlledPanel = tab.getAttribute('aria-controls');
            const panel = document.getElementById(idControlledPanel);
            panels.push(panel);
        });
        
        const tablist = new Tablist(tabs, panels, activeTabIndex);
        const director = new Director(), 
            builder = new HorizontalTablistBuilder();

        director.constructTablist(builder, tablist);
    });
});