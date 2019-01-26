# HappyGua
一个基于canvas的刮刮乐工具，简单好用

## Install

```sh
npm install happy-gua
```

## Usage

**1.定义一个具有一个父子节点dom结构, HappyGua会在在该结构上进行初始化**
```html
<div id="guaguale">
    <div class="inner">谢谢惠顾</div>
</div>
```
```js
new HappyGua({
      ele: '#guaguale', //挂载元素，必填
      radius: 5, //擦除半径，默认10，选填
      ratio: 0.5, //擦除面积，超过该数值将执行callback，默认0.8，选填
      coverColor: '#f6f6f6', //涂层颜色，默认#cccccc，选填
      //···其它配置懒得写···
      callback: function() {
        this.clearAll(); //调用该方法将清除涂层
      }
    })
```
