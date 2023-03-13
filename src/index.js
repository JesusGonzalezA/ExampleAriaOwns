import { 
    HorizontalTabList,
    HorizontalAutomaticTabList, 
    ClosableTabList, 
    ClosableAOTabList,
    ClosableAOWithToolbarTabList
} from './components/tablist/index.js'

const tabs = [
    { tabTitle: "Breakfast", panelParagraph: "Coffee and milk" },
    { tabTitle: "Lunch", panelParagraph: "Lasagna" },
    { tabTitle: "Dinner", panelParagraph: "Fish and chips" }
];

const restoreButtonClassName = '.restore-tablist-button';

const populateTabList = (tablist) => {
    tabs.forEach(tab => tablist.addTab(tab));
} 

const createTabLists = () => {
    const horizontalTabListDom = document.getElementById('tablist1');
    const horizontalTabList = new HorizontalTabList(horizontalTabListDom);

    const horizontalAutomaticTabListDom = document.getElementById('tablist2');
    const horizontalAutomaticTabList = new HorizontalAutomaticTabList(horizontalAutomaticTabListDom);

    const closableTabListDom = document.getElementById('tablist3');
    const closableTabList = new ClosableTabList(closableTabListDom);

    const closableAOTabListDom = document.getElementById('tablist4');
    const closableAOTabList = new ClosableAOTabList(closableAOTabListDom);

    const closableAOWithToolbarTabListDom = document.getElementById('tablist5');
    const closableAOWithToolbarTabList = new ClosableAOWithToolbarTabList(closableAOWithToolbarTabListDom);

    return [horizontalTabList, horizontalAutomaticTabList, closableTabList, closableAOTabList, closableAOWithToolbarTabList];
};

const createRestoreTabListButtons = (tablists) => {
    const restoreTablistButtons = document.querySelectorAll(restoreButtonClassName);

    restoreTablistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tablistId = button.dataset.tablist;
            const tablist = tablists.find(tablist => tablist._anchorDom.id === tablistId);
            tablist.swapTabs(tabs);
            tablist._reRender();
        });
    });
};

window.addEventListener('load', () => {
    const tablists = createTabLists();
    tablists.forEach(tablist => {
        populateTabList(tablist);
        tablist.render();
    });

    createRestoreTabListButtons(tablists);
});