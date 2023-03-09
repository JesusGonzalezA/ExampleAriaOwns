import Tab from "../Tab.js";

export default class HorizontalAutomaticTab extends Tab {
    _updateState(isSelected) {
        super._updateState(isSelected);
        this._getEl().setAttribute('tabindex', (isSelected) ? 0 : -1);
    }
}