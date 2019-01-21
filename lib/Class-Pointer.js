import * as AGE_Event from "./Class-Event.js"

export class Pointer {
    constructor(level) {
        this.level = level;
        this.x = undefined;
        this.y = undefined;
        this.event_mousemove = new AGE_Event.Event_Set();
        this.event_mousedown = new AGE_Event.Event_Set();
        this.event_mouseup = new AGE_Event.Event_Set();
    }
    init(target) {
        this.target = target;
        switch (this.level) {
            case 1:
                this.target.onmousemove = this.handle_mousemove.bind(this);
                this.target.onmousedown = this.handle_mousedown.bind(this);
                this.target.onmouseup = this.handle_mouseup.bind(this);
                break;
            case 2:
                this.target.addEventListener("mousemove", this.handle_mousemove.bind(this));
                this.target.addEventListener("mousedown", this.handle_mousedown.bind(this));
                this.target.addEventListener("mouseup", this.handle_mouseup.bind(this));
                break;
            case 3:
                this.target.move = this.handle_mousemove.bind(this);
                this.target.down = this.handle_mousedown.bind(this);
                this.target.up = this.handle_mouseup.bind(this);
                break;
            default:
                break;
        }
    }

    handle_mousemove(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.event_mousemove.trigger();
    }

    handle_mousedown(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.event_mousedown.trigger();
    }

    handle_mouseup(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.event_mouseup.trigger();
    }
    scans(boxes) {
        let results = [];
        boxes.forEach((box) => {
            if (box.scanable && this.scan(box)) {
                results.push(box);
            }
        });
        return results;
    }
    scan(box) {
        return box.offsetX < this.x && this.x < box.offsetX + box.width &&
            box.offsetY < this.y && this.y < box.offsetY + box.height;
    }
}