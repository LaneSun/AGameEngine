import * as AGE_Paint from "./Class-Paint.js"
import * as AGE_Gui from "./Class-Gui.js";

export class Display {
    constructor(storage) {
        this.paused = false;
        this.mouse = undefined;
        this.Storage = storage;
        this.Painter = new AGE_Paint.Painter(this.Storage.ImageScope);
        this.Gui = new AGE_Gui.Gui(this.Painter, {
            size: window.innerHeight / GUI_NUM,
            width: window.innerWidth,
            height: window.innerHeight,
            offsetX: 0,
            offsetY: 0
        });
        window.Gui = this.Gui;
        window.AGE_Gui = AGE_Gui;
    }
    init(canvas) {
        this.Painter.init(canvas);
        this.Gui.init();
        Gui.add(2, new AGE_Gui.Ui_Button(3, 50, 600, "Hello Everyone, My Name is Lane Sun, Nice To Meet You!"));
        Gui.add(2, new AGE_Gui.Ui_Button(3, 50, 650, "thisisatestmessage!?/.,`+-*=%1234567890"));
        Gui.add(2, new AGE_Gui.Ui_Button(3, 50, 500, "$2.00"));
        Gui.add(2, new AGE_Gui.Ui_Button(3, 250, 500, "Yes", () => {
            alert("Right!")
        }));
        Gui.add(2, new AGE_Gui.Ui_Button(3, 450, 500, "No"));
    }
    loop() {
        if (!this.paused) {
            this.clear();
            this.Gui.draw();
            requestAnimationFrame(this.loop.bind(this));
        }
    }
    clear() {
        this.Painter.clear();
    }
    show_mouse() {
        this.mouse = this.Gui.add(10, new AGE_Gui.Gui_Mouse(POINTER_SIZE));
    }
    hide_mouse() {
        this.Gui.remove(this.mouse);
    }
    start_loop() {
        this.paused = false;
        this.loop();
    }
    stop_loop() {
        this.paused = true;
    }
}