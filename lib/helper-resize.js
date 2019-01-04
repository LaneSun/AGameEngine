(function () {
    let reSize = () => {
        let w = window.innerWidth,
            h = window.innerHeight,
            cav = document.getElementById("canvas");
        if (ENABLE_ROTATE || h > w) {
            cav.width = h;
            cav.height = w;
            // cav.style.rotate = "90deg";
        } else {
            cav.width = w;
            cav.height = h;
            // cav.style.rotate = "0";
        }
    };
    window.addEventListener("load",reSize);
    window.addEventListener("resize",reSize);
})();