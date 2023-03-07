export default class CustomHtmlDomParser {
    #parser = null;

    constructor() {
        this.#parser = new DOMParser();
    }

    stringToNode (str) {
        return this.#parser
            .parseFromString(str, "text/html")
            .body
            .firstElementChild;
    }
}