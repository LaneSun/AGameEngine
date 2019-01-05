import * as AGE_Paint from "./Class-Paint.js"
import * as AGE_Gui from "./Class-Gui";

export class Display {
    constructor(storage) {
        this.Storage = storage;
        this.Painter = new AGE_Paint.Painter(this.Storage.ImageScope);
        this.Gui = new AGE_Gui.Gui(this.Painter, {
            size: window.innerHeight / GUI_NUM,
            width: window.innerWidth,
            height: window.innerHeight,
            offsetX: 0,
            offsetY: 0
        });
    }
    init(canvas) {
        this.Painter.init(canvas);
        this.Gui.init();
    }
}