export class Image {
    constructor(src) {
        this.src = src;
        this.data = undefined;
    }
    getdata() {
        return this.data;
    }
}
export class ImageScope {
    constructor() {
        this.scope = new Map();
    }
    add(id, data) {
        if (!this.scope.has(id)) {
            this.scope.set(id, data);
        }
    }
    get(id) {
        return this.scope.get(id);
    }
}
export class ImageLoader {
    constructor(scope) {
        this.scope = scope;
    }
    load(id, src) {
        let img = new Image();
        let promise = new Promise((resolve) => {
            img.onload = () => {
                resolve();
            }
        });
        let promise2 = new Promise((resolve) => {
            promise.then(() => {
                createImageBitmap(img).then((response) => {
                    resolve(response);
                });
            });
        });
        promise2.then((data) => {
            this.scope.add(id, data);
        });
        img.src = src;
    }
}