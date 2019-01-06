//Settings
const
CANVAS_ID = "canvas",
CANVAS_RATIO = 1,
COLOR_HOVER = "#fdff79",
COLOR_MARK = "#ff5252",
COLOR_DARK = "#848484",
COLOR_DEFAULT = "#d5d5d5",
ENABLE_ROTATE = false,
GUI_NUM = 32,
GUI_IMAGE_SIZE = 8,
FONT_IMAGE_SIZE = 12,
FONT_IMAGE_HEIGHT = 15,
LOGO_RATIO = 2,
MOUSE_SIZE = 16,
NOSMOOTH = true,
POINTER_SIZE = 4,
SHOW_LOGO = true;

let
    FONT_DISPLAY_HEIGHT = GUI_IMAGE_SIZE / FONT_IMAGE_SIZE * FONT_IMAGE_HEIGHT;

//Resources to load
RES = {
    images: [
        {id: "gui-pointer", src: "res/img/gui-pointer.png"},
        {id: "gui-border-1", src: "res/img/gui-border-top.png"},
        {id: "gui-border-2", src: "res/img/gui-border-bottom.png"},
        {id: "gui-border-3", src: "res/img/gui-border-left.png"},
        {id: "gui-border-4", src: "res/img/gui-border-right.png"},
        {id: "gui-border-5", src: "res/img/gui-border-topL.png"},
        {id: "gui-border-6", src: "res/img/gui-border-topR.png"},
        {id: "gui-border-7", src: "res/img/gui-border-bottomL.png"},
        {id: "gui-border-8", src: "res/img/gui-border-bottomR.png"},
        {id: "gui-border-1-mark", src: "res/img/gui-border-top-mark.png"},
        {id: "gui-border-2-mark", src: "res/img/gui-border-bottom-mark.png"},
        {id: "gui-border-3-mark", src: "res/img/gui-border-left-mark.png"},
        {id: "gui-border-4-mark", src: "res/img/gui-border-right-mark.png"},
        {id: "gui-border-5-mark", src: "res/img/gui-border-topL-mark.png"},
        {id: "gui-border-6-mark", src: "res/img/gui-border-topR-mark.png"},
        {id: "gui-border-7-mark", src: "res/img/gui-border-bottomL-mark.png"},
        {id: "gui-border-8-mark", src: "res/img/gui-border-bottomR-mark.png"},
        {id: "gui-border-1-hover", src: "res/img/gui-border-top-hover.png"},
        {id: "gui-border-2-hover", src: "res/img/gui-border-bottom-hover.png"},
        {id: "gui-border-3-hover", src: "res/img/gui-border-left-hover.png"},
        {id: "gui-border-4-hover", src: "res/img/gui-border-right-hover.png"},
        {id: "gui-border-5-hover", src: "res/img/gui-border-topL-hover.png"},
        {id: "gui-border-6-hover", src: "res/img/gui-border-topR-hover.png"},
        {id: "gui-border-7-hover", src: "res/img/gui-border-bottomL-hover.png"},
        {id: "gui-border-8-hover", src: "res/img/gui-border-bottomR-hover.png"},
        {id: "gui-border-1-dark", src: "res/img/gui-border-top-dark.png"},
        {id: "gui-border-2-dark", src: "res/img/gui-border-bottom-dark.png"},
        {id: "gui-border-3-dark", src: "res/img/gui-border-left-dark.png"},
        {id: "gui-border-4-dark", src: "res/img/gui-border-right-dark.png"},
        {id: "gui-border-5-dark", src: "res/img/gui-border-topL-dark.png"},
        {id: "gui-border-6-dark", src: "res/img/gui-border-topR-dark.png"},
        {id: "gui-border-7-dark", src: "res/img/gui-border-bottomL-dark.png"},
        {id: "gui-border-8-dark", src: "res/img/gui-border-bottomR-dark.png"},
        {id: "gui-font1", src: "res/img/font1.png"},
        {id: "logo", src: "res/img/ANLFUN logo.png"},
    ]
};

//Font converter
CONVERT = new Map();
CONVERT.set(" ", -1);
CONVERT.set("a",0);
CONVERT.set("b",1);
CONVERT.set("c",2);
CONVERT.set("d",3);
CONVERT.set("e",4);
CONVERT.set("f",5);
CONVERT.set("g",6);
CONVERT.set("h",7);
CONVERT.set("i",8);
CONVERT.set("j",9);
CONVERT.set("k",10);
CONVERT.set("l",11);
CONVERT.set("m",12);
CONVERT.set("n",13);
CONVERT.set("o",14);
CONVERT.set("p",15);
CONVERT.set("q",16);
CONVERT.set("r",17);
CONVERT.set("s",18);
CONVERT.set("t",19);
CONVERT.set("u",20);
CONVERT.set("v",21);
CONVERT.set("w",22);
CONVERT.set("x",23);
CONVERT.set("y",24);
CONVERT.set("z",25);
CONVERT.set("A",26);
CONVERT.set("B",27);
CONVERT.set("C",28);
CONVERT.set("D",29);
CONVERT.set("E",30);
CONVERT.set("F",31);
CONVERT.set("G",32);
CONVERT.set("H",33);
CONVERT.set("I",34);
CONVERT.set("J",35);
CONVERT.set("K",36);
CONVERT.set("L",37);
CONVERT.set("M",38);
CONVERT.set("N",39);
CONVERT.set("O",40);
CONVERT.set("P",41);
CONVERT.set("Q",42);
CONVERT.set("R",43);
CONVERT.set("S",44);
CONVERT.set("T",45);
CONVERT.set("U",46);
CONVERT.set("V",47);
CONVERT.set("W",48);
CONVERT.set("X",49);
CONVERT.set("Y",50);
CONVERT.set("Z",51);
CONVERT.set(",",52);
CONVERT.set(".",53);
CONVERT.set("?",54);
CONVERT.set("!",55);
CONVERT.set(":",56);
CONVERT.set(";",57);
CONVERT.set("\"",58);
CONVERT.set("'",59);
CONVERT.set("(",60);
CONVERT.set(")",61);
CONVERT.set("~",62);
CONVERT.set("`",63);
CONVERT.set("$",64);
CONVERT.set("%",65);
CONVERT.set("*",66);
CONVERT.set("/",67);
CONVERT.set("+",68);
CONVERT.set("-",69);
CONVERT.set("=",70);
CONVERT.set("1",71);
CONVERT.set("2",72);
CONVERT.set("3",73);
CONVERT.set("4",74);
CONVERT.set("5",75);
CONVERT.set("6",76);
CONVERT.set("7",77);
CONVERT.set("8",78);
CONVERT.set("9",79);
CONVERT.set("0",80);

//Font Width
FONT_WIDTH = new Map();
FONT_WIDTH.set(" ", 0.5);
FONT_WIDTH.set("a", 0.8);
FONT_WIDTH.set("b", 0.9);
FONT_WIDTH.set("c", 0.8);
FONT_WIDTH.set("d", 0.9);
FONT_WIDTH.set("e", 0.8);
FONT_WIDTH.set("f", 0.7);
FONT_WIDTH.set("g", 0.9);
FONT_WIDTH.set("h", 0.9);
FONT_WIDTH.set("i", 0.4);
FONT_WIDTH.set("j", 0.5);
FONT_WIDTH.set("k", 0.8);
FONT_WIDTH.set("l", 0.4);
FONT_WIDTH.set("m", 1);
FONT_WIDTH.set("n", 1);
FONT_WIDTH.set("o", 0.9);
FONT_WIDTH.set("p", 0.9);
FONT_WIDTH.set("q", 0.9);
FONT_WIDTH.set("r", 0.6);
FONT_WIDTH.set("s", 0.7);
FONT_WIDTH.set("t", 0.5);
FONT_WIDTH.set("u", 0.9);
FONT_WIDTH.set("v", 0.8);
FONT_WIDTH.set("w", 1);
FONT_WIDTH.set("x", 0.8);
FONT_WIDTH.set("y", 0.7);
FONT_WIDTH.set("z", 0.8);
FONT_WIDTH.set("A", 1);
FONT_WIDTH.set("B", 1);
FONT_WIDTH.set("C", 1);
FONT_WIDTH.set("D", 1);
FONT_WIDTH.set("E", 1);
FONT_WIDTH.set("F", 1);
FONT_WIDTH.set("G", 1);
FONT_WIDTH.set("H", 1);
FONT_WIDTH.set("I", 0.6);
FONT_WIDTH.set("J", 0.6);
FONT_WIDTH.set("K", 1);
FONT_WIDTH.set("L", 0.8);
FONT_WIDTH.set("M", 1);
FONT_WIDTH.set("N", 1);
FONT_WIDTH.set("O", 1);
FONT_WIDTH.set("P", 1);
FONT_WIDTH.set("Q", 1);
FONT_WIDTH.set("R", 1);
FONT_WIDTH.set("S", 1);
FONT_WIDTH.set("T", 0.8);
FONT_WIDTH.set("U", 1);
FONT_WIDTH.set("V", 1);
FONT_WIDTH.set("W", 1);
FONT_WIDTH.set("X", 1);
FONT_WIDTH.set("Y", 0.8);
FONT_WIDTH.set("Z", 1);
FONT_WIDTH.set(",", 0.4);
FONT_WIDTH.set(".", 0.4);
FONT_WIDTH.set("?", 0.6);
FONT_WIDTH.set("!", 0.4);
FONT_WIDTH.set(":", 0.4);
FONT_WIDTH.set(";", 0.6);
FONT_WIDTH.set("\"", 0.8);
FONT_WIDTH.set("'", 0.4);
FONT_WIDTH.set("(", 0.6);
FONT_WIDTH.set(")", 0.6);
FONT_WIDTH.set("~", 0.8);
FONT_WIDTH.set("`", 0.8);
FONT_WIDTH.set("$", 0.8);
FONT_WIDTH.set("%", 1.1);
FONT_WIDTH.set("*", 0.8);
FONT_WIDTH.set("/", 0.8);
FONT_WIDTH.set("+", 0.8);
FONT_WIDTH.set("-", 0.6);
FONT_WIDTH.set("=", 0.9);
FONT_WIDTH.set("1", 0.7);
FONT_WIDTH.set("2", 0.8);
FONT_WIDTH.set("3", 0.8);
FONT_WIDTH.set("4", 0.8);
FONT_WIDTH.set("5", 0.8);
FONT_WIDTH.set("6", 0.8);
FONT_WIDTH.set("7", 0.7);
FONT_WIDTH.set("8", 0.7);
FONT_WIDTH.set("9", 0.7);
FONT_WIDTH.set("0", 0.7);


