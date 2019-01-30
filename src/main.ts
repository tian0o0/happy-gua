interface Options {
    ele?: string;
    radius?: number;
    coverColor?: string;
    coverText?: string;
    coverPic?: string;
    ratio?: number;
    complete?: Function;
}
export default class HappyGua {
    canvas: any;
    ctx: any;
    // wrapEle: any;
    innerEle: any;
    canvasW: number;
    canvasH: number;
    isMobile: boolean;
    events: any[];
    startEventHandler: Function;
    moveEventHandler: Function;
    endEventHandler: Function;
    defaultOptions: Options;
    options: Options;
    constructor(options: Options) {
        this.canvas = null;
        this.ctx = null;
        // this.wrapEle = null;
        this.innerEle = null;
        this.canvasW = 0;
        this.canvasH = 0;
        this.isMobile = false;
        this.events = [];
        this.startEventHandler = null;
        this.moveEventHandler = null;
        this.endEventHandler = null;
        this.defaultOptions = {
            radius: 10,
            coverColor: '#CCCCCC',
            ratio: .8
        };
        this.options = Object.assign({}, this.defaultOptions, options);
        this.beforeInit().init().eventDetect().onStart();
    }

    beforeInit() {
        if(!isCanvasSupported()){
            throw new Error('The broswer you are using is not support canvas');
        }
        this.innerEle = document.querySelector(this.options.ele);
        if (!this.innerEle ) {
            throw new Error('Can not find element: ' + this.options.ele);
        };
        return this;
    }

    init() {
        
        this.canvasH = this.innerEle.clientHeight;
        this.canvasW = this.innerEle.clientWidth;
        
        const wrapEle = document.createElement('div')
        wrapEle.style.position = 'relative';
        wrapEle.style.height = this.innerEle.clientHeight;
        wrapEle.style.width = this.innerEle.clientWidth;
        
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.canvasH;
        this.canvas.width = this.canvasW;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.ctx = this.canvas.getContext('2d');
        if (this.options.coverPic) {
            let coverPic = new Image();
            coverPic.src = this.options.coverPic;
            coverPic.crossOrigin = 'anonymous';
            coverPic.onload = () => { this.ctx.drawImage(coverPic, 0, 0, this.canvasW, this.canvasH); }
        } else {
            this.ctx.fillStyle = this.options.coverColor;
            this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
        }
        wrapEle.appendChild(this.innerEle)
        wrapEle.insertBefore(this.canvas, this.innerEle)
        document.body.appendChild(wrapEle)
        return this;
    }

    eventDetect() {
        if('ontouchstart' in window) this.isMobile = true;
        this.events = this.isMobile ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
        return this;
    }

    onStart() {
        this.startEventHandler = _startHandler.bind(this);
        this.canvas.addEventListener(this.events[0], this.startEventHandler, false);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        this.canvas.removeEventListener(this.events[0], this.startEventHandler);
        this.canvas.removeEventListener(this.events[1], this.moveEventHandler);
        this.canvas.removeEventListener(this.events[2], this.endEventHandler);
    };

    calc(callback: Function) {
        var pixels = this.ctx.getImageData(0, 0, this.canvasW, this.canvasH);
        var transPixels = [];
        pixels.data.forEach((item: [], i: number) => {
            let pixel = pixels.data[i + 3];
            if(pixel === 0) {
                transPixels.push(pixel);
            }
        })

        if (transPixels.length / pixels.data.length > this.options.ratio) {
            callback && typeof callback === 'function' && callback.call(this);
        }
    }
}

function isCanvasSupported(){
    let ele = document.createElement('canvas');
    return !!(ele.getContext && ele.getContext('2d'));
}
function _startHandler(e) {
    e.preventDefault();
    this.moveEventHandler = _moveHandler.bind(this);
    this.canvas.addEventListener(this.events[1], this.moveEventHandler, false);
    this.endEventHandler = _endHandler.bind(this);
    document.addEventListener(this.events[2], this.endEventHandler, false);
};
function _moveHandler(e) {
    e.preventDefault();
    var evt = this.isMobile ? e.touches[0] : e;
    var coverPos = this.canvas.getBoundingClientRect();
    var pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var mouseX = evt.pageX - coverPos.left - pageScrollLeft;
    var mouseY = evt.pageY - coverPos.top - pageScrollTop;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#fff';
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.arc(mouseX, mouseY, this.options.radius * 2, 0, 2 * Math.PI);
    this.ctx.fill();
};
function _endHandler(e) {
    e.preventDefault();
    if (this.options.complete && typeof this.options.complete === 'function') this.calc(this.options.complete)
    this.canvas.removeEventListener(this.events[1],this.moveEventHandler,false);
    document.removeEventListener(this.events[2],this.endEventHandler,false);
};


    

    

   


