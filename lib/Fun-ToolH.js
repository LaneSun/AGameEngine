import * as ColoH from "./Fun-ColoH.js";
import * as PosiH from "./Fun-PosiH.js";
import * as SlicH from "./Fun-SlicH.js";

export let Raw = (painter, id, data, coloH, posiH, slicH) => {
    painter.image(id, data, coloH, posiH, slicH);
};
export let Logo = (painter) => {
    Raw(painter, "logo", {size_ratio: LOGO_RATIO}, ColoH.Raw, PosiH.RatioCenter, SlicH.Raw);
};
export let Box = (painter, x1, y1, x2, y2) => {
    let data = {
        numX: GUI_NUM,
        numY: GUI_NUM
    };
    Raw(painter, "gui-border-5", {...data, x: x1, y: y1}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
    Raw(painter, "gui-border-6", {...data, x: x2, y: y1}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
    Raw(painter, "gui-border-7", {...data, x: x1, y: y2}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
    Raw(painter, "gui-border-8", {...data, x: x2, y: y2}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
    for (let i = x1 + 1; i < x2; i++) {
        Raw(painter, "gui-border-1", {...data, x: i, y: y1}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
        Raw(painter, "gui-border-2", {...data, x: i, y: y2}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
    }
    for (let i = y1 + 1; i < y2; i++) {
        Raw(painter, "gui-border-3", {...data, x: x1, y: i}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
        Raw(painter, "gui-border-4", {...data, x: x2, y: i}, ColoH.Raw, PosiH.Cells, SlicH.Raw);
    }
    let posi1 = PosiH.Cells(undefined, {...data, x: x1 + 1, y: y1 + 1}, painter),
        posi2 = PosiH.Cells(undefined, {...data, x: x2, y: y2}, painter);
    painter.fill("#848484", posi1.x - 1, posi1.y - 1, posi2.x - posi1.x + 2, posi2.y - posi1.y + 2
    );
};
