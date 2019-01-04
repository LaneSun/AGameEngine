(function () {
    let reSize = () => {
        let w = window.innerWidth,
            h = window.innerHeight,
            cav = document.getElementById("canvas");
        cav.width = w;
        cav.height = h;
        if (h > w) {
            cav.style.rotate = "90deg";
        } else {
            cav.style.rotate = "0";
        }
    };
    document.addEventListener("load",reSize);
    document.addEventListener("resize",reSize);
})();