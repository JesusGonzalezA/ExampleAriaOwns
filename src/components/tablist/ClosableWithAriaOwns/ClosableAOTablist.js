import ClosableTabList from "../Closable/ClosableTabList.js";
import ClosableAOTab from "./ClosableAOTab.js";

export default class ClosableAOTabList extends ClosableTabList {
    _createTab(tabId, panelId, tabTitle) {
        return new ClosableAOTab(tabId, panelId, tabTitle);
      }
}