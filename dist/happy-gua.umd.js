!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self,t.HappyGua=e())}(this,function(){"use strict";function t(){let t=document.createElement("canvas");return!(!t.getContext||!t.getContext("2d"))}function e(t){t.preventDefault(),this.moveEventHandler=n.bind(this),this.canvas.addEventListener(this.events[1],this.moveEventHandler,!1),this.endEventHandler=s.bind(this),document.addEventListener(this.events[2],this.endEventHandler,!1)}function n(t){t.preventDefault();var e=this.isMobile?t.touches[0]:t,n=this.canvas.getBoundingClientRect(),s=document.documentElement.scrollTop||document.body.scrollTop,i=document.documentElement.scrollLeft||document.body.scrollLeft,a=e.pageX-n.left-i,o=e.pageY-n.top-s;this.ctx.beginPath(),this.ctx.fillStyle="#FFFFFF",this.ctx.globalCompositeOperation="destination-out",this.ctx.arc(a,o,2*this.options.radius,0,2*Math.PI),this.ctx.fill()}function s(t){t.preventDefault(),this.options.complete&&"function"==typeof this.options.complete&&this.calc(this.options.complete),this.canvas.removeEventListener(this.events[1],this.moveEventHandler,!1),document.removeEventListener(this.events[2],this.endEventHandler,!1)}class i{constructor(t){this.canvas=null,this.ctx=null,this.wrapEle=null,this.innerEle=null,this.canvasW=0,this.canvasH=0,this.isMobile=!1,this.events=[],this.startEventHandler=null,this.moveEventHandler=null,this.endEventHandler=null,this.defaultOptions={radius:10,coverColor:"#CCCCCC",ratio:.8},this.options=Object.assign({},this.defaultOptions,t),this.beforeInit().init().eventDetect().onStart()}beforeInit(){if(!t())throw new Error("The broswer you are using is not support canvas");if(this.wrapEle=document.querySelector(this.options.ele),this.innerEle=this.wrapEle.children[0],!this.wrapEle||!this.innerEle)throw new Error("Your dom structure seems wrong, please check it");return this}init(){if(this.canvasH=this.wrapEle.clientHeight,this.canvasW=this.wrapEle.clientWidth,this.innerEle.style.opacity=0,this.canvas=document.createElement("canvas"),this.canvas.id="cover",this.canvas.height=this.canvasH,this.canvas.width=this.canvasW,this.canvas.style.position="absolute",this.canvas.style.top=0,this.canvas.style.left=0,this.ctx=this.canvas.getContext("2d"),this.options.coverPic){let t=new Image;t.src=this.options.coverPic,t.crossOrigin="anonymous",t.onload=(()=>{this.ctx.drawImage(t,0,0,this.canvasW,this.canvasH)})}else this.ctx.fillStyle=this.options.coverColor,this.ctx.fillRect(0,0,this.canvasW,this.canvasH);return this.wrapEle.appendChild(this.canvas),this.innerEle.style.opacity=1,this}eventDetect(){return"ontouchstart"in window&&(this.isMobile=!0),this.events=this.isMobile?["touchstart","touchmove","touchend"]:["mousedown","mousemove","mouseup"],this}onStart(){this.startEventHandler=e.bind(this),this.canvas.addEventListener(this.events[0],this.startEventHandler,!1)}clear(){this.ctx.clearRect(0,0,this.canvasW,this.canvasH),this.canvas.removeEventListener(this.events[0],this.startEventHandler),this.canvas.removeEventListener(this.events[1],this.moveEventHandler),this.canvas.removeEventListener(this.events[2],this.endEventHandler)}calc(t){var e=this.ctx.getImageData(0,0,this.canvasW,this.canvasH),n=[];e.data.forEach((t,s)=>{let i=e.data[s+3];0===i&&n.push(i)}),n.length/e.data.length>this.options.ratio&&t&&"function"==typeof t&&t.call(this)}}return i});
