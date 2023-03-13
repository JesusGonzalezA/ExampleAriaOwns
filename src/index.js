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

window.addEventListener('load', () => {
    const tablists = createTabLists();
    tablists.forEach(tablist => {
        populateTabList(tablist);
        tablist.render();
    });

    const restoreTablistButtons = document.querySelectorAll('.restore-tablist-button');

    restoreTablistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tablistId = button.dataset.tablist;
            const tablist = tablists.find(tablist => tablist._anchorDom.id === tablistId);
            tablist.swapTabs(tabs);
            tablist._reRender();
            // const tablist = document.getElementById(tablistId);
            // tablist.innerHTML = '';
            // if(tablist.id =='tablist3'){
            //     const closableTabList = new ClosableTabList(tablist);
            //     populateTabList(closableTabList);
            //     closableTabList.render();
            // }
            // else if(tablist.id =='tablist4') {
            //     const closableAOTabList = new ClosableAOTabList(tablist);
            //     populateTabList(closableAOTabList);
            //     closableAOTabList.render();
            // }
            // else if(tablist.id == 'tablist5') {
            //     const closableAOWithToolbarTabList = new ClosableAOWithToolbarTabList(tablist);
            //     populateTabList(closableAOWithToolbarTabList);
            //     closableAOWithToolbarTabList.render();
            // }
        });
    });
});