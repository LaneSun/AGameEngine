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
        this.offsetX = undefined;
        this.offsetY = undefined;
        this.height = undefined;
        this.width = undefined;
    }

    draw(painter) {
        //
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setWidth(w) {
        this.width = w;
    }

    setHeight(h) {
        this.height = h;
    }

    setSize(w, h) {
        this.setWidth(w);
        this.setHeight(h);
    }

    setPosition(x, y) {
        this.offsetX = x;
        this.offsetY = y;
    }
}

export class Gui_Image extends Gui_Unit {
    constructor(id, x, y, w, h) {
        super();
        this.offsetX = x;
        this.offsetY = y;
        this.width = w;
        this.height = h;
        this.scanable = false;
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
    constructor(size, x, y, w, h, ary1, ary2, ary3) {
        super(x,y,w,h);
        this.size = size;
        this.image_ary = ary1;
        this.flag_ary = ary2;
        this.color_ary = ary3;
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
                flag = this.flag_ary[2];
                painter.fill(this.color_ary[2], x + w - 1, y + w - 1, sw - w * 2 + 2, sh - w * 2 + 2);
            } else if (this.hover) {
                flag = this.flag_ary[1];
                painter.fill(this.color_ary[1], x + w - 1, y + w - 1, sw - w * 2 + 2, sh - w * 2 + 2);
            } else {
                flag = this.flag_ary[0];
                painter.fill(this.color_ary[0], x + w - 1, y + w - 1, sw - w * 2 + 2, sh - w * 2 + 2);
            }
            painter.image(this.image_ary[4] + flag, ColoH.Raw, 0, 0, s, s, x, y, w, w);
            painter.image(this.image_ary[5] + flag, ColoH.Raw, 0, 0, s, s, x + sw - w, y, w, w);
            painter.image(this.image_ary[6] + flag, ColoH.Raw, 0, 0, s, s, x, y + sh - w, w, w);
            painter.image(this.image_ary[7] + flag, ColoH.Raw, 0, 0, s, s, x + sw - w, y + sh - w, w, w);
            painter.image(this.image_ary[0] + flag, ColoH.Raw, 0, 0, s, s, x + w - 1, y, sw - 2 * w + 2, w);
            painter.image(this.image_ary[2] + flag, ColoH.Raw, 0, 0, s, s, x, y + w - 1, w, sh - 2 * w + 2);
            painter.image(this.image_ary[1] + flag, ColoH.Raw, 0, 0, s, s, x + w - 1, y + sh - w, sw - 2 * w + 2, w);
            painter.image(this.image_ary[3] + flag, ColoH.Raw, 0, 0, s, s, x + sw - w, y + w - 1, w, sh - 2 * w + 2);
        }
    }
}

export class Gui_Box_Default extends Gui_Box {
    constructor(size, x, y, w, h) {
        super(size, x, y, w, h, [
            "gui-border-1",
            "gui-border-2",
            "gui-border-3",
            "gui-border-4",
            "gui-border-5",
            "gui-border-6",
            "gui-border-7",
            "gui-border-8"
        ], [
            "",
            "-hover",
            "-dark"
        ], [
            COLOR_DEFAULT,
            COLOR_HOVER,
            COLOR_DARK
        ]);
    }
}

export class Gui_Box_Dark extends Gui_Box {
    constructor(size, x, y, w, h) {
        super(size, x, y, w, h, [
            "gui-border-1",
            "gui-border-2",
            "gui-border-3",
            "gui-border-4",
            "gui-border-5",
            "gui-border-6",
            "gui-border-7",
            "gui-border-8"
        ], [
            "-dark",
            "",
            "-hover"
        ], [
            COLOR_DARK,
            COLOR_DEFAULT,
            COLOR_HOVER
        ]);
    }
}

export class Gui_Button_Box extends Gui_Box_Default {
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
        this.height = FONT_DISPLAY_HEIGHT * this.size;
        this.setWidth = undefined;
        this.setHeight = undefined;
        this.setSize = undefined;
        this.init();
    }

    init() {
        this.width = Tool.getTextWidth(this.msg) * this.size * GUI_IMAGE_SIZE;
    }

    setMessage(msg) {
        this.msg = msg;
        this.init();
    }
    draw(painter) {
        if (this.visible) {
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
}

export class Gui_Text_Single extends Gui_Unit {
    constructor(size, x, y, w = Infinity, msg) {
        super();
        this.scanable = false;
        this.msg = msg;
        this.size = size;
        this.offsetX = x;
        this.offsetY = y;
        this.width = w;
        this.setHeight = undefined;
        this.setSize = undefined;
        this.children = [];
        this.init();
    }

    init() {
        let h = 0;
        let ary = Tool.getTextBreakByWord(this.msg, this.width / this.size / GUI_IMAGE_SIZE);
        ary.push(this.msg.length + 1);
        ary.unshift(0);
        for (let i = 1; i < ary.length; i++) {
            this.children[i - 1] = new Gui_Text(this.size, this.offsetX, this.offsetY + h, this.msg.substring(ary[i - 1], ary[i] - 1));
            h += this.children[i - 1].height + TEXT_BR_HEIGHT * FONT_DISPLAY_HEIGHT * this.size;
            ;
        }

        this.height = h - TEXT_BR_HEIGHT * FONT_DISPLAY_HEIGHT * this.size;
        ;
    }

    getMaxWidth() {
        let w = 0;
        for (let child of this.children) {
            let mw = child.getWidth();
            w = mw > w ? mw : w;
        }
        return w;
    }

    setMessage(msg) {
        this.msg = msg;
        this.init();
    }

    setWidth(w) {
        this.width = w;
        this.init();
    }

    draw(painter) {
        if (this.visible) {
            for (let child of this.children) {
                child.draw(painter);
            }
        }
    }
}

export class Gui_Text_Block extends Gui_Unit {
    constructor(size, x, y, w = Infinity, msg) {
        super();
        this.scanable = false;
        this.msg = msg;
        this.size = size;
        this.offsetX = x;
        this.offsetY = y;
        this.width = w;
        this.setHeight = undefined;
        this.setSize = undefined;
        this.children = [];
        this.init();
    }

    init() {
        let h = 0;
        let ary = this.msg.split(/[\n]/);
        for (let i = 0; i < ary.length; i++) {
            this.children[i] = new Gui_Text_Single(this.size, this.offsetX, this.offsetY + h, this.width, ary[i]);
            h += this.children[i].height + TEXT_PR_HEIGHT * FONT_DISPLAY_HEIGHT * this.size;
        }
        this.height = h - TEXT_PR_HEIGHT * FONT_DISPLAY_HEIGHT * this.size;
    }

    getMaxWidth() {
        let w = 0;
        for (let child of this.children) {
            let mw = child.getMaxWidth();
            w = mw > w ? mw : w;
        }
        return w;
    }

    setMessage(msg) {
        this.msg = msg;
        this.init();
    }

    setWidth(w) {
        this.width = w;
        this.init();
    }

    draw(painter) {
        if (this.visible) {
            for (let child of this.children) {
                child.draw(painter);
            }
        }
    }
}

export class Ui_Unit {
    constructor() {
        this.event_moveover = new AGE_Event.Event_Set();
        this.event_moveout = new AGE_Event.Event_Set();
        this.event_down = new AGE_Event.Event_Set();
        this.event_up = new AGE_Event.Event_Set();
        this.scanable = false;
        this.visible = true;
        this.enable = true;
        this.offsetX = undefined;
        this.offsetY = undefined;
        this.height = undefined;
        this.width = undefined;
    }

    draw(painter) {
        if (this.visible) {
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].draw(painter);
            }
        }
    }

    init() {
        for (let child of this.children) {
            child.setSize(this.width, this.height);
            child.setPosition(this.offsetX, this.offsetY);
        }
    }

    setWidth(w) {
        this.width = w;
        this.init();
    }

    setHeight(h) {
        this.height = h;
        this.init();
    }

    setSize(w, h) {
        this.setWidth(w);
        this.setHeight(h);
    }

    setPosition(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        this.init();
    }
}

export class Ui_Button extends Ui_Unit {
    constructor(size, x, y, w = Infinity, msg, handle) {
        let s = GUI_IMAGE_SIZE,
            fw = FONT_IMAGE_SIZE,
            fh = FONT_IMAGE_HEIGHT;
        super();
        this.width = w;
        this.msg = msg;
        this.offsetX = x;
        this.offsetY = y;
        let text_gui = new Gui_Text_Block(size, x + s * size, y + s * size, this.width - 2 * s * size, this.msg);
        let box_gui = new Gui_Box_Default(size, x, y, text_gui.getMaxWidth() + 2 * s * size, text_gui.getHeight() + 2 * s * size);
        this.children = [box_gui, text_gui];
        this.height = box_gui.height;
        if (handle) {
            this.event_down.bind(handle);
        }
    }

    getMaxWidth() {
        return this.children[1].getWidth();
    }

    init() {
        let s = GUI_IMAGE_SIZE,
            fw = FONT_IMAGE_SIZE,
            fh = FONT_IMAGE_HEIGHT;
        this.children[1].setWidth(this.width - 2 * s * this.size);
        this.children[0].setSize(this.children[0].getMaxWidth() + 2 * s * this.size, this.children[0].getHeight() + 2 * s * this.size);
        this.height = this.children[1].height;
        this.children[1].setPosition(this.offsetX + s * this.size, this.offsetY + s * this.size);
        this.children[0].setPosition(this.offsetX, this.offsetY);
    }
}