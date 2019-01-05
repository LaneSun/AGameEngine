export class Painter {
    constructor(scope) {
        this.canvas = undefined;
        this.context = undefined;
        this.scope = scope;
        this.settings = {
            ratio: CANVAS_RATIO
        }
    }
    init(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        if (NOSMOOTH) {
            this.context.imageSmoothingEnabled = false;
        }
    }
    image(id, data, coloH, posiH, slicH) {
        let img = coloH(this.scope.get(id)),
        posi = posiH(img, data, this),
        slic = slicH(img, data, this);
        this.context.drawImage(img, slic.sx, slic.sy, slic.sw, slic.sh, posi.x, posi.y, posi.w, posi.h);
    }
    fill(color, x = 0, y = 0, w = this.getW(), h = this.getH()) {
        this.context.fillStyle = color;
        this.context.fillRect(x,y,w,h);
    }
    clear(x = 0, y = 0, w = this.getW(), h = this.getH()) {
        this.context.clearRect(x,y,w,h);
    }
    getW() {
        return this.canvas.width;
    }
    getH() {
        return this.canvas.height;
    }
}