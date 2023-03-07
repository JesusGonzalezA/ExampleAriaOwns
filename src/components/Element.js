import CustomHtmlDomParser from '../helpers/CustomHtmlDomParser.js';

export default class Element {
    _renderTpl() {
        throw new Error("You should override _renderTpl");
    }

    _createNode({ ...args }) {
        return new CustomHtmlDomParser().stringToNode(this._renderTpl(args));
    }
}