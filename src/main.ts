interface Options {
    ele?: string;
    radius?: number;
    coverColor?: string;
    coverText?: string;
    coverPic?: string;
    ratio?: number;
    callback?: Function;
}
export default class HappyGua {
    canvas: any;
    ctx: any;
    wrapEle: any;
    innerEle: any;
    canvasW: number;
    canvasH: number;
    supportTouch: boolean;
    events: any[];
    startEventHandler: Function;
    moveEventHandler: Function;
    endEventHandler: Function;
    defaultOptions: Options;
    constructor(options: Options) {
        this.canvas = null;
        this.ctx = null;
        this.wrapEle = null;
        this.innerEle = null;
        this.canvasW = 0;
        this.canvasH = 0;
        this.supportTouch = false;
        this.events = [];
        this.startEventHandler = null;
        this.moveEventHandler = null;
        this.endEventHandler = null;
        this.defaultOptions = {
            radius: 10,
            coverColor: '#CCCCCC',
            coverText: '',
            coverPic: '',
            ratio: .8
        };
        // const mergeOptions = Object.assign({}, this.defaultOptions, options);

        this.init(options);
    }

    init(options) {
        if(!isCanvasSupported()){
            throw new Error('the broswer you using is not support canvas');
            return;
        }
        _forEach(arguments, item => {
            if (typeof item === "object") {
                for (var k in item) {
                    if (k === 'callback' && typeof item[k] === 'function') {
                        this.defaultOptions.callback = item[k].bind(this);
                    } else {
                        k in this.defaultOptions && (this.defaultOptions[k] = item[k]);
                    }
                }
            } else if (typeof item === "function") {
                this.defaultOptions.callback = item.bind(this);
            }
        });
        this.wrapEle = document.querySelector(options.ele);
        this.innerEle = this.wrapEle.children[0];
        if (!this.wrapEle || !this.innerEle) {
            throw new Error('your dom structure seems wrong, please check it')
        };
        this.canvasH = this.wrapEle.clientHeight;
        this.canvasW = this.wrapEle.clientWidth;
        this.innerEle.style.opacity = 0;
        this.createCanvas();
        this.eventDetect();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'cover';
        this.canvas.height = this.canvasH;
        this.canvas.width = this.canvasW;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = 0;
        this.ctx = this.canvas.getContext('2d');
        if (this.defaultOptions.coverPic) {
            let coverPic = new Image();
            coverPic.src = this.defaultOptions.coverPic;
            coverPic.onload = () => { this.ctx.drawImage(coverPic, 0, 0, this.canvas.width, this.canvas.height); }
        } else {
            this.ctx.fillStyle = this.defaultOptions.coverColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.wrapEle.appendChild(this.canvas);
        this.innerEle.style.opacity = 1;
    }

    eventDetect() {
        if('ontouchstart' in window) this.supportTouch = true;
        this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
        this.listenStart();
    }

    listenStart() {
        this.startEventHandler = _startHandler.bind(this);
        this.canvas.addEventListener(this.events[0], this.startEventHandler, false);
    }

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.removeEventListener(this.events[0], this.startEventHandler);
        this.canvas.removeEventListener(this.events[1], this.moveEventHandler);
        this.canvas.removeEventListener(this.events[2], this.endEventHandler);
    };

    calcRatio(callback) {
        var pixels = this.ctx.getImageData(0, 0, this.canvasW, this.canvasH);
        var transPixels = [];
        _forEach(pixels.data, function(item, i) {
            var pixel = pixels.data[i + 3];
            if (pixel === 0) {
                transPixels.push(pixel);
            }
        });

        if (transPixels.length / pixels.data.length > this.defaultOptions.ratio) {
            callback && typeof callback === 'function' && callback();
        }
    }
}


    

    function _forEach(items, callback) {
        return Array.prototype.forEach.call(items, function(item, idx) {
            callback(item, idx);
        });
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
        var evt = this.supportTouch ? e.touches[0] : e;
        var coverPos = this.canvas.getBoundingClientRect();
        var pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        var mouseX = evt.pageX - coverPos.left - pageScrollLeft;
        var mouseY = evt.pageY - coverPos.top - pageScrollTop;

        this.ctx.beginPath();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.arc(mouseX, mouseY, this.defaultOptions.radius * 2, 0, 2 * Math.PI);
        this.ctx.fill();
    };

    function _endHandler(e) {
        e.preventDefault();
        if (this.defaultOptions.callback && typeof this.defaultOptions.callback === 'function') this.calcRatio(this.defaultOptions.callback)
        this.canvas.removeEventListener(this.events[1],this.moveEventHandler,false);
        document.removeEventListener(this.events[2],this.endEventHandler,false);
    };


    

    

   


