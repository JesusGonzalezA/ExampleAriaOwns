import CustomHtmlDomParser from '../helpers/CustomHtmlDomParser.js';

export default class Element {
    _renderTpl = "";

    _createNode() {
        return new CustomHtmlDomParser().stringToNode(this._renderTpl);
    }
}