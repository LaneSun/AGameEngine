import * as AGE_Image from "./Class-Image.js"
import * as AGE_Event from "./Class-Event.js"

export class Storage {
    constructor() {
        this.ImageScope = new AGE_Image.ImageScope();
        this.ImageLoader = new AGE_Image.ImageLoader(this.ImageScope);
        this.event_load = new AGE_Event.Event();
    }
    init(res) {
        return new Promise((resolve) => {
            let promises = [];
            if (res.images) {
                for (let unit of res.images) {
                    promises.push(this.ImageLoader.load(unit.id, unit.src));
                }
            }
            Promise.all(promises).then(this.event_load.trigger.bind(this.event_load)).then(resolve);
        });
    }
}