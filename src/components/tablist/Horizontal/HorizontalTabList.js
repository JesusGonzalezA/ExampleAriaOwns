import Tablist from "../tablist.js";
import HorizontalTab from "./HorizontalTab.js";

export default class HorizontalTabList extends Tablist {
    _createTab(tabId, panelId, tabTitle) {
        return new HorizontalTab(tabId, panelId, tabTitle);
      }
}