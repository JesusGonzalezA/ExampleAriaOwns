class Tablist {
    #tabs = [];
    #panels = [];
    #activeTabIndex = -1;

    constructor(tabs, panels, activeTabIndex = 0) {
        this.#tabs = tabs;
        this.#panels = panels;
        this.#activeTabIndex = activeTabIndex;
        this.#initialize();
    }

    setActiveTab(newActiveTabIndex) {
        this.#tabs.forEach((tab, index) => {
            tab.setAttribute('aria-selected', index === newActiveTabIndex);
            tab.setAttribute('tabindex', (index == newActiveTabIndex) ? 0 : -1);
        });
        this.#panels.forEach((panel, index) => panel.style.setProperty('display', (index === newActiveTabIndex) ? 'block' : 'none'));
    }

    addClickEvents() {
        this.#tabs.forEach((tab, index) => {
            tab.onclick = () => this.setActiveTab(index);
            tab.onkeydown = event => {
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    const nextIndex = (index + 1) % this.#tabs.length;
                    this.setActiveTab(nextIndex);
                    this.#tabs[nextIndex].focus();
                } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    const prevIndex = (index - 1 + this.#tabs.length) % this.#tabs.length;
                    this.setActiveTab(prevIndex);
                    this.#tabs[prevIndex].focus();
                }
            }
        });
    }
    
    #initialize() {
        this.setActiveTab(this.#activeTabIndex);
        this.#makePanelsFocusable();
    }

    #makePanelsFocusable() {
        this.#panels.forEach(panel => panel.setAttribute('tabindex', 0));
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

        this.#addClickEvents();
    }

    #addClickEvents() {
        this.#getTablist().addClickEvents();
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