class HappyGua {
    constructor(options, callback) {
        this.cover = null;
        this.ctx = null;
        this.scratchDiv = null;
        this.cardDiv = null;
        this.cHeight = 0;
        this.cWidth = 0;
        this.supportTouch = false;
        this.events = [];
        this.startEventHandler = null;
        this.moveEventHandler = null;
        this.endEventHandler = null;
        this.defaultOptions = {
            coverColor: '#C5C5C5',
            coverPic: '',
            ratio: .8,
            callback: null
        };
        this.init(options, callback);
    }
    init(options, callback) {
        if (!_isCanvasSupported()) {
            console.error('对不起，当前浏览器不支持Canvas，无法使用本控件！');
            return;
        }
        var _this = this;
        _forEach(arguments, function (item) {
            if (typeof item === "object") {
                for (var k in item) {
                    if (k === 'callback' && typeof item[k] === 'function') {
                        _this.defaultOptions.callback = item[k].bind(_this);
                    }
                    else {
                        k in _this.defaultOptions && (_this.defaultOptions[k] = item[k]);
                    }
                }
            }
            else if (typeof item === "function") {
                _this.defaultOptions.callback = item.bind(_this);
            }
        });
        this.scratchDiv = document.getElementById('scratch');
        this.cardDiv = document.getElementById('card');
        if (!this.scratchDiv || !this.cardDiv)
            return;
        this.cHeight = this.cardDiv.clientHeight;
        this.cWidth = this.cardDiv.clientWidth;
        this.cardDiv.style.opacity = 0;
        this.createCanvas();
        this.eventDetect();
    }
    createCanvas() {
        this.cover = document.createElement('canvas');
        this.cover.id = 'cover';
        this.cover.height = this.cHeight;
        this.cover.width = this.cWidth;
        this.cover.style.position = 'absolute';
        this.cover.style.top = 0;
        this.ctx = this.cover.getContext('2d');
        if (this.defaultOptions.coverPic) {
            var _this = this;
            var coverPic = new Image();
            coverPic.src = this.defaultOptions.coverPic;
            coverPic.onload = function () {
                _this.ctx.drawImage(coverPic, 0, 0, _this.cover.width, _this.cover.height);
            };
        }
        else {
            this.ctx.fillStyle = this.defaultOptions.coverColor;
            this.ctx.fillRect(0, 0, this.cover.width, this.cover.height);
        }
        this.scratchDiv.appendChild(this.cover);
        this.cardDiv.style.opacity = 1;
    }
    /**
     * To detect whether support touch events
     */
    eventDetect() {
        if ('ontouchstart' in window)
            this.supportTouch = true;
        this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
        this.addEvent();
    }
    /**
     * Add touchstart/mousedown event listener
     */
    addEvent() {
        this.startEventHandler = _startEventHandler.bind(this);
        this.cover.addEventListener(this.events[0], this.startEventHandler, false);
    }
    /**
    * Clear pixels of canvas
    */
    clearCover() {
        this.ctx.clearRect(0, 0, this.cover.width, this.cover.height);
        this.cover.removeEventListener(this.events[0], this.startEventHandler);
        this.cover.removeEventListener(this.events[1], this.moveEventHandler);
        this.cover.removeEventListener(this.events[2], this.endEventHandler);
    }
    ;
}
function _calcArea(ctx, callback, ratio) {
    var pixels = ctx.getImageData(0, 0, this.cWidth, this.cHeight);
    var transPixels = [];
    _forEach(pixels.data, function (item, i) {
        var pixel = pixels.data[i + 3];
        if (pixel === 0) {
            transPixels.push(pixel);
        }
    });
    if (transPixels.length / pixels.data.length > ratio) {
        callback && typeof callback === 'function' && callback();
    }
}
function _forEach(items, callback) {
    return Array.prototype.forEach.call(items, function (item, idx) {
        callback(item, idx);
    });
}
function _isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}
/**
 * touchstart/mousedown event handler
 */
function _startEventHandler(event) {
    event.preventDefault();
    this.moveEventHandler = _moveEventHandler.bind(this);
    this.cover.addEventListener(this.events[1], this.moveEventHandler, false);
    this.endEventHandler = _endEventHandler.bind(this);
    document.addEventListener(this.events[2], this.endEventHandler, false);
}
/**
 * touchmove/mousemove event handler
 */
function _moveEventHandler(event) {
    event.preventDefault();
    var evt = this.supportTouch ? event.touches[0] : event;
    var coverPos = this.cover.getBoundingClientRect();
    var pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var mouseX = evt.pageX - coverPos.left - pageScrollLeft;
    var mouseY = evt.pageY - coverPos.top - pageScrollTop;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.arc(mouseX, mouseY, 20, 0, 2 * Math.PI);
    this.ctx.fill();
}
/**
 * touchend/mouseup event handler
 */
function _endEventHandler(event) {
    event.preventDefault();
    if (this.defaultOptions.callback && typeof this.defaultOptions.callback === 'function')
        _calcArea.call(this, this.ctx, this.defaultOptions.callback, this.defaultOptions.ratio);
    this.cover.removeEventListener(this.events[1], this.moveEventHandler, false);
    document.removeEventListener(this.events[2], this.endEventHandler, false);
}

export default HappyGua;
