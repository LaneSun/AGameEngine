import * as AGE_Pointer from "./Class-Pointer.js"

export class Gui {
    constructor(painter, sets) {
        this.painter = painter;
        this.pointer = new AGE_Pointer.Pointer(2);
        this.size = sets.size;
        this.width = sets.width;
        this.height = sets.height;
        this.offsetX = sets.offsetX;
        this.offsetY = sets.offsetY;
    }
    init() {
        this.pointer.init(document);
    }
}