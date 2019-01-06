import * as AGE_Pointer from "./Class-Pointer.js"
import * as AGE_Event from "./Class-Event.js"
import * as ColoH from "./Fun-ColoH.js"
import * as Tool from "./Fun-ToolH.js"

export class Gui {
    constructor(painter, sets) {
        this.painter = painter;
        this.pointer = new AGE_Pointer.Pointer(2);
        this.layer = [];
        this.units = new Set();
        this.size = sets.size;
        this.width = sets.width;
        this.height = sets.height;
        this.offsetX = sets.offsetX;
        this.offsetY = sets.offsetY;
        this.inactive_units = new Set();
    }

    init() {
        this.pointer.init(document);
        this.pointer.event_move.bind(this.handle_mousemove.bind(this));
        this.pointer.event_down.bind(this.handle_mousedown.bind(this));
        this.pointer.event_up.bind(this.handle_mouseup.bind(this));
    }

    draw() {
        for (let i = 0; i < this.layer.length; i++) {
            if (this.layer[i]) {
                this.layer[i].forEach((unit) => {
                    unit.draw(this.painter, this);
                });
            }
        }
    }

    add(layer, unit) {
        if (this.layer[layer]) {
            this.layer[layer].add(unit);
        } else {
            this.layer[layer] = new Set([unit]);
        }
        this.units.add(unit);
        return unit;
    }

    remove(unit) {
        for (let units of this.layer) {
            if (units && units.has(unit)) {
                units.delete(unit);
            }
        }
        this.units.delete(unit);
        return unit;
    }

    handle_mousemove() {
        let active_units = new Set(this.pointer.scans(this.units));
        let inactive_units = this.inactive_units;
        active_units.forEach((unit) => {
            if (!inactive_units.has(unit)) {
                unit.event_moveover.trigger();
            }
        });
        inactive_units.forEach((unit) => {
            if (!active_units.has(unit)) {
                unit.event_moveout.trigger();
            }
        });
        this.inactive_units = active_units;
    }

    handle_mousedown() {
        this.pointer.scans.bind(this.pointer)(this.units).forEach((unit) => {
            unit.event_down.trigger();
        });
    }

    handle_mouseup() {
        // this.pointer.scans.bind(this.pointer)(this.units).forEach((unit) => {
        //     unit.event_up.trigger();
        // })
        this.units.forEach((unit) => {
            unit.event_up.trigger();
        });
    }
}

export class Gui_Unit {
    constructor() {
        this.event_moveover = new AGE_Event.Event_Set();
        this.event_moveout = new AGE_Event.Event_Set();
        this.event_down = new AGE_Event.Event_Set();
        this.event_up = new AGE_Event.Event_Set();
        this.scanable = true;
        this.visible = true;
        this.enable = true;
    }

    draw(painter) {
        //
    }

}

export class Gui_Mouse extends Gui_Unit{
    constructor(size) {
        super();
        this.scanable = false;
        this.size = size;
    }

    draw(painter, gui) {
        if (this.visible) {
            let x = gui.pointer.x,
                y = gui.pointer.y;
            painter.image("gui-pointer", ColoH.Raw, 0, 0, MOUSE_SIZE, MOUSE_SIZE, x, y, MOUSE_SIZE * POINTER_SIZE, MOUSE_SIZE * this.size);
        }
    }
}

export class Gui_Rect extends Gui_Unit{
    constructor(x,y,w,h) {
        super();
        this.offsetX = x;
        this.offsetY = y;
        this.width = w;
        this.height = h;
        this.scanable = true;
        this.hover = false;
        this.click = false;
        this.event_moveover.bind((this.handle_over.bind(this)));
        this.event_moveout.bind((this.handle_out.bind(this)));
        this.event_down.bind((this.handle_down.bind(this)));
        this.event_up.bind((this.handle_up.bind(this)));
    }

    handle_over() {
        this.hover = true;
    }
    handle_out() {
        this.hover = false;
    }
    handle_down() {
        this.click = true;
    }
    handle_up() {
        this.click = false;
    }

    draw(painter) {
        if (this.visible) {
            if (this.click) {
                painter.fill(COLOR_MARK, this.offsetX, this.offsetY, this.width, this.height);
            } else if (this.hover) {
                painter.fill(COLOR_HOVER, this.offsetX, this.offsetY, this.width, this.height);
            } else {
                painter.fill(COLOR_DEFAULT, this.offsetX, this.offsetY, this.width, this.height);
            }
        }
    }
}

export class Gui_Box extends Gui_Rect{
    constructor(size,x,y,w,h) {
        super(x,y,w,h);
        this.size = size;
    }

    draw(painter) {
        if (this.visible) {
            let flag = undefined;
            let s = GUI_IMAGE_SIZE,
                w = s * this.size,
                x = this.offsetX,
                y = this.offsetY,
                sw = this.width,
                sh = this.height;
            if (this.click) {
                flag = "-dark";
                painter.fill(COLOR_DARK, x + w - 1, y + w - 1, sw - w * 2 + 2, sh - w * 2 + 2);
            } else if (this.hover) {
                flag = "-hover";
                painter.fill(COLOR_HOVER, x + w - 1, y + w - 1, sw - w * 2 + 2, sh - w * 2 + 2);
            } else {
                flag = "";
                painter.fill(COLOR_DEFAULT, x + w - 1, y + w - 1, sw - w * 2 + 2, sh - w * 2 + 2);
            }
            painter.image("gui-border-5" + flag, ColoH.Raw, 0, 0, s, s, x, y, w, w);
            painter.image("gui-border-6" + flag, ColoH.Raw, 0, 0, s, s, x + sw - w, y, w, w);
            painter.image("gui-border-7" + flag, ColoH.Raw, 0, 0, s, s, x, y + sh - w, w, w);
            painter.image("gui-border-8" + flag, ColoH.Raw, 0, 0, s, s, x + sw - w, y + sh - w, w, w);
            painter.image("gui-border-1" + flag, ColoH.Raw, 0, 0, s, s, x + w - 1, y, sw - 2 * w + 2, w);
            painter.image("gui-border-2" + flag, ColoH.Raw, 0, 0, s, s, x + w - 1, y + sh - w, sw - 2 * w + 2, w);
            painter.image("gui-border-3" + flag, ColoH.Raw, 0, 0, s, s, x, y + w - 1, w, sh - 2 * w + 2);
            painter.image("gui-border-4" + flag, ColoH.Raw, 0, 0, s, s, x + sw - w, y + w - 1, w, sh - 2 * w + 2);
        }
    }
}

export class Gui_Button_Box extends Gui_Box{
    constructor(size,x,y,w) {
        super(size,x,y,w, GUI_IMAGE_SIZE * size * 3);
    }
}

export class Gui_Text extends Gui_Unit {
    constructor(size,x,y,msg) {
        super();
        this.scanable = false;
        this.msg = msg;
        this.size = size;
        this.offsetX = x;
        this.offsetY = y;
    }

    draw(painter) {
        let s = GUI_IMAGE_SIZE,
            w = s * this.size,
            x = this.offsetX,
            y = this.offsetY,
            fw = FONT_IMAGE_SIZE,
            fh = FONT_IMAGE_HEIGHT;
        for (let i = 0; i < this.msg.length; i++) {
            painter.image("gui-font1", ColoH.Raw, CONVERT.get(this.msg[i]) * fw, 0, fw, fh, Tool.getTextWidth(this.msg.substring(0, i)) * w - w * (1 - FONT_WIDTH.get(this.msg[i])) / 2 + x, y, w, FONT_DISPLAY_HEIGHT * this.size);
        }
    }
}

export class Ui_Button extends Gui_Button_Box {
    constructor(size, x, y, msg, handle) {
        let s = GUI_IMAGE_SIZE,
            fw = FONT_IMAGE_SIZE,
            fh = FONT_IMAGE_HEIGHT;
        super(size, x, y, s * size * (2 + Tool.getTextWidth(msg)), s * size * 3);
        this.msg = msg;
        this.text_gui = new Gui_Text(size, x + s * size, y + s * size * 1.5 - FONT_DISPLAY_HEIGHT * size / 2, this.msg);
        if (handle) {
            this.event_down.bind(handle);
        }
    }

    draw(painter) {
        super.draw(painter);
        this.text_gui.draw(painter);
    }
}