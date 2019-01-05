export class Event {
    constructor(level) {
        this.handles = new Map();
    }
    bind(id, handle) {
        this.handles.set(id, handle);
    }
    unbind(id) {
        this.handles.delete(id);
    }
    trigger() {
        this.handles.forEach((handle) => {
            handle.call(...arguments);
        });
    }
}