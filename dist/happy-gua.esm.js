function isCanvasSupported(){let t=document.createElement("canvas");return!(!t.getContext||!t.getContext("2d"))}function _startHandler(t){t.preventDefault(),this.moveEventHandler=_moveHandler.bind(this),this.canvas.addEventListener(this.events[1],this.moveEventHandler,!1),this.endEventHandler=_endHandler.bind(this),document.addEventListener(this.events[2],this.endEventHandler,!1)}function _moveHandler(t){t.preventDefault();var e=this.isMobile?t.touches[0]:t,n=this.canvas.getBoundingClientRect(),s=document.documentElement.scrollTop||document.body.scrollTop,i=document.documentElement.scrollLeft||document.body.scrollLeft,a=e.pageX-n.left-i,o=e.pageY-n.top-s;this.ctx.beginPath(),this.ctx.fillStyle="#fff",this.ctx.globalCompositeOperation="destination-out",this.ctx.arc(a,o,2*this.options.radius,0,2*Math.PI),this.ctx.fill()}function _endHandler(t){t.preventDefault(),this.options.complete&&"function"==typeof this.options.complete&&this.calc(this.options.complete),this.canvas.removeEventListener(this.events[1],this.moveEventHandler,!1),document.removeEventListener(this.events[2],this.endEventHandler,!1)}class HappyGua{constructor(t){this.canvas=null,this.ctx=null,this.innerEle=null,this.canvasW=0,this.canvasH=0,this.isMobile=!1,this.events=[],this.startEventHandler=null,this.moveEventHandler=null,this.endEventHandler=null,this.defaultOptions={radius:10,coverColor:"#CCCCCC",ratio:.8},this.options=Object.assign({},this.defaultOptions,t),this.beforeInit().init().eventDetect().onStart()}beforeInit(){if(!isCanvasSupported())throw new Error("The broswer you are using is not support canvas");if(this.innerEle=document.querySelector(this.options.ele),!this.innerEle)throw new Error("Can not find element: "+this.options.ele);return this}init(){this.canvasH=this.innerEle.clientHeight,this.canvasW=this.innerEle.clientWidth;const t=document.createElement("div");if(t.style.position="relative",t.style.height=this.innerEle.clientHeight,t.style.width=this.innerEle.clientWidth,this.canvas=document.createElement("canvas"),this.canvas.height=this.canvasH,this.canvas.width=this.canvasW,this.canvas.style.position="absolute",this.canvas.style.top=0,this.canvas.style.left=0,this.ctx=this.canvas.getContext("2d"),this.options.coverPic){let t=new Image;t.src=this.options.coverPic,t.crossOrigin="anonymous",t.onload=(()=>{this.ctx.drawImage(t,0,0,this.canvasW,this.canvasH)})}else this.ctx.fillStyle=this.options.coverColor,this.ctx.fillRect(0,0,this.canvasW,this.canvasH);return t.appendChild(this.innerEle),t.insertBefore(this.canvas,this.innerEle),document.body.appendChild(t),this}eventDetect(){return"ontouchstart"in window&&(this.isMobile=!0),this.events=this.isMobile?["touchstart","touchmove","touchend"]:["mousedown","mousemove","mouseup"],this}onStart(){this.startEventHandler=_startHandler.bind(this),this.canvas.addEventListener(this.events[0],this.startEventHandler,!1)}clear(){this.ctx.clearRect(0,0,this.canvasW,this.canvasH),this.canvas.removeEventListener(this.events[0],this.startEventHandler),this.canvas.removeEventListener(this.events[1],this.moveEventHandler),this.canvas.removeEventListener(this.events[2],this.endEventHandler)}calc(t){var e=this.ctx.getImageData(0,0,this.canvasW,this.canvasH),n=[];e.data.forEach((t,s)=>{let i=e.data[s+3];0===i&&n.push(i)}),n.length/e.data.length>this.options.ratio&&t&&"function"==typeof t&&t.call(this)}}export default HappyGua;
