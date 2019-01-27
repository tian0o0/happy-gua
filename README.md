# HappyGua
- HappyGua是一个简单好用的刮刮乐工具
- 提供 esm/cjs/umd
- typescript支持，能够在angular项目中开箱即用
## Install
```sh
npm install happy-gua
```
## Usage
**1.定义一个具有父子节点的dom结构, HappyGua会在该结构上进行初始化**
```html
<div id="guaguale">
  <div class="inner">谢谢惠顾</div>
</div>
```
**2.初始化**
```js
import HappyGua from 'happy-gua'

new HappyGua({
  ele: '#guaguale', //挂载元素，必须
  radius: 5, //擦除半径，默认10px，可选
  ratio: 0.5, //擦除面积，超过该数值将执行complete，默认0.8，可选
  coverColor: '#f6f6f6', //涂层颜色，默认#cccccc，可选
  coverPic: './cover-pic.png', //涂层图片，默认无，设置后coverColor将失效，可选
  compelet: function() { //可选
    this.clear(); //调用该方法将清空涂层
  }
})
```
