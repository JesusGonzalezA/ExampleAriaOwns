class Tablist {
    #tabs = [];
    #panels = [];
    #activeTabIndex = -1;
    // Wrapper for the tablist, it represents the div id in which the tablist will be constructed
    #anchorDom = null;

    // New constructor to create an empty tablist
    // The user needs to call the addTab method
    constructor(anchorDom, activeTabIndex = 0) {
        this.#anchorDom = anchorDom;
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
        this.#tabs.forEach((tab, index) => tab.onclick = () => this.setActiveTab(index));
    }
    
    #initialize() {
        this.setActiveTab(this.#activeTabIndex);
        this.#makePanelsFocusable();
    }

    #makePanelsFocusable() {
        this.#panels.forEach(panel => panel.setAttribute('tabindex', 0));
    }

    // Function to add a new tab and its corresponding panel to the tablist
    // I should create a new DOM element for the tab and one for the panel and
    // update the arrays
    addTab(tabTitle, panelParagraph) {
        // create a new tab (html node)
        const tab = `
        <button id="example_tab1" aria-controls="example1_panel1" role="tab" aria-selected="true" type="button">
            ${tabTitle}
        </button>
        `
        // create a new panel (html node)
        const panel = `
        <div id="example1_panel1" aria-labelledby="example_tab1" role="tabpanel" tabindex="0">
            <p>${panelParagraph}</p>
        </div>
        `
        // add the new tab and new panel to the arrays
        this.#tabs.add(tab);
        this.#panels.add(panel);
    }

    // Function to make the tablist renderablke
    // It appends all the tabs and panels to the anchor dom element
    render() {
        const html = `
        <div role="tablist">
            <button id="example_tab1" aria-controls="example1_panel1" role="tab" aria-selected="true" type="button">
                Breakfast
            </button>
            <button id="example_tab2" aria-controls="example1_panel2" role="tab" aria-selected="false" type="button">
                Lunch
            </button>
            <button id="example_tab3" aria-controls="example1_panel3" role="tab" aria-selected="false" type="button">
                Dinner
            </button>
        </div>
        <div>
            <div id="example1_panel1" aria-labelledby="example_tab1" role="tabpanel" tabindex="0">
                <p>Coffee and milk</p>
                <button>Hello</button>
            </div>
            <div id="example1_panel2" aria-labelledby="example_tab2" role="tabpanel">Fish and chips</div>
            <div id="example1_panel3" aria-labelledby="example_tab3" role="tabpanel">Salad</div>
        </div>
        `;
        const html = `
        <div role="tablist">
            ${tabs.map(tab => tab.getHtml())}
        </div>
        `
        // create a html node from the string and append it to the anchorDom
        this.#anchorDom.appendChild(html);
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
    const director = new Director();
    const horizontalBuilder = new HorizontalTablistBuilder();

    const tablistHorizontalDom = document.getElementById('tablist1');
    const tablistHorizontal = new Tablist(tablistHorizontalDom);

    tablistHorizontal.addTab("Breakfast", "Coffee and milk");
    tablistHorizontal.addTab();
    tablistHorizontal.addTab();
    tablistHorizontal.render();

    // director.constructTablist(horizontalBuilder, tablistHorizontal);
});