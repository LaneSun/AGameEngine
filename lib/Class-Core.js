/*
Core of the Engine
*/
import * as AGE_Image from "./Class-Image.js"

export class AGE {
    constructor(settings) {
        this.ImageScope = new AGE_Image.ImageScope();
        this.ImageLoader = new AGE_Image.ImageLoader(this.ImageScope);
    }
    init(res = {}) {
        let promises = [];
        if (res.images) {
            for (let unit of res.images) {
                promises.push(this.ImageLoader.load(unit.id, unit.src));
            }
        }
    }
}