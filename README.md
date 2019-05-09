# HappyGua
- HappyGua是一个简单好用的刮刮乐工具
- 提供 esm/cjs/umd
- typescript支持
## Install
```sh
npm install happy-gua
# or
yarn add happy-gua
```
## Usage
**1.定义一个DOM节点, HappyGua会在该结构上进行初始化**
```html
<div id="gua">谢谢惠顾</div>
```
**2.初始化**
```js
import HappyGua from 'happy-gua'

new HappyGua({
  ele: '#gua', //挂载元素，必须
  radius: 5, //擦除半径，默认10px，可选
  ratio: 0.5, //擦除面积，超过该数值将执行complete，默认0.8，可选
  coverColor: '#f6f6f6', //涂层颜色，默认#cccccc，可选
  coverPic: './cover-pic.png', //涂层图片，默认无，设置后coverColor将失效，可选
  complete: function() { //可选
    this.clear(); //调用该方法将清空涂层
  }
})
```
## Demo
1. Clone the code to your local.
```sh
git clone git@github.com:tian0o0/happy-gua.git
```
2. Start rollup dev environment to watch the file's change and build at real time
```sh
npm run dev
```
3. If necessary, run `http-server` at the root folder to see the demo.
