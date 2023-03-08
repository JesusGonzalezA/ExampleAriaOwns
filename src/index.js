import { 
    HorizontalTabList, 
    ClosableTabList, 
    ClosableAOTabList,
    ClosableAOWithToolbarTabList
} from './components/tablist/index.js'

const populateTabList = (tablist) => {
    tablist.addTab("Breakfast", "Coffee and milk");
    tablist.addTab("Lunch","Lasagna");
    tablist.addTab("Dinner","Fish and chips");
} 

const createTabLists = () => {
    const horizontalTabListDom = document.getElementById('tablist1');
    const horizontalTabList = new HorizontalTabList(horizontalTabListDom);

    const closableTabListDom = document.getElementById('tablist2');
    const closableTabList = new ClosableTabList(closableTabListDom);

    const closableAOTabListDom = document.getElementById('tablist3');
    const closableAOTabList = new ClosableAOTabList(closableAOTabListDom);

    const closableAOWithToolbarTabListDom = document.getElementById('tablist4');
    const closableAOWithToolbarTabList = new ClosableAOWithToolbarTabList(closableAOWithToolbarTabListDom);

    return [horizontalTabList, closableTabList, closableAOTabList, closableAOWithToolbarTabList];
};

window.addEventListener('load', () => {
    const tablists = createTabLists();
    tablists.forEach(tablist => {
        populateTabList(tablist);
        tablist.render();
    });
});