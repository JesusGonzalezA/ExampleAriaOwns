import Tablist from './components/tablist.js'

window.addEventListener('load', () => {
    const tablistHorizontalDom = document.getElementById('tablist1');
    const tablistHorizontal = new Tablist(tablistHorizontalDom);

    tablistHorizontal.addTab("Breakfast", "Coffee and milk");
    tablistHorizontal.addTab("Lunch","Lasagna");
    tablistHorizontal.addTab("Dinner","Fish and chips");
    tablistHorizontal.render();
});