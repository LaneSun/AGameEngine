import * as AGE_Event from "./Class-Event.js"

export class Pointer {
    constructor(level) {
        this.level = level;
        this.x = undefined;
        this.y = undefined;
        this.event_move = new AGE_Event.Event_Set();
        this.event_down = new AGE_Event.Event_Set();
        this.event_up = new AGE_Event.Event_Set();
    }
    init(target) {
        this.target = target;
        switch (this.level) {
            case 1:
                this.target.onmousemove = this.handle_move.bind(this);
                this.target.onmousedown = this.handle_down.bind(this);
                this.target.onmouseup = this.handle_up.bind(this);
                break;
            case 2:
                this.target.addEventListener("mousemove",this.handle_move.bind(this));
                this.target.addEventListener("mousedown",this.handle_down.bind(this));
                this.target.addEventListener("mouseup",this.handle_up.bind(this));
                break;
            case 3:
                this.target.move = this.handle_move.bind(this);
                this.target.down = this.handle_down.bind(this);
                this.target.up = this.handle_up.bind(this);
                break;
            default:
                break;
        }
    }
    handle_move(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.event_move.trigger();
    }
    handle_down(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.event_down.trigger();
    }
    handle_up(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.event_up.trigger();
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