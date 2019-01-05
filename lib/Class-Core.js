/*
Core of the Engine
*/
import * as AGE_Display from "./Class-Display.js"
import * as AGE_Storage from "./Class-Storage.js"
import * as AGE_PaintTool from "./Fun-ToolH.js"

export class AGE {
    constructor() {
        this.Storage = new AGE_Storage.Storage();
        this.Display = new AGE_Display.Display(this.Storage);
    }
    init(res = {}) {
        this.Storage.init(res);
        this.Display.init(document.getElementById("canvas"));
        let promises = [];
        if (res.images) {
            for (let unit of res.images) {
                promises.push(this.ImageLoader.load(unit.id, unit.src));
            }
        }
        Promise.all(promises).then(() => {
            if (SHOW_LOGO) {
                this.display_logo().then(() => {
                    this.main();
                });
            } else {
                this.main();
            }
        })
    }
    display_logo() {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                this.Painter.clear();
                AGE_PaintTool.Logo(this.Painter);
            }, 1000);
            window.setTimeout(() => {
                this.Painter.clear();
            },5000);
            window.setTimeout(() => {resolve()},6000);
        });
    }
    main() {
        this.Painter.fill("#ffffff");
        AGE_PaintTool.Box(this.Painter, 4, 8, 24, 16);
    }
}