/**
 * Created by Administrator on 2018/4/24.
 */
// 通过面向对象的方法来创建食物对象;
//1 先创建一个构造函数
function Food(options) {
  //给对象参数设置默认值
  options = options || {}  // 初始化对象
  this.x = options.x || 0
  this.y = options.y || 0
  this.width = options.width || 20
  this.height = options.height || 20
  this.bgColor = options.bgColor||'green'
}
//因为函数参数是有顺序的,所以,如果想要设置后面的参数的值,前面的值也必须指定
//渲染方法
//将渲染方法放在Food的原型对象中
//2给原型对象添加render方法
Food.prototype.render = function (target) {
  //根据上面的配置项,来创建一个DOM对象,并渲染在页面中
  //思路
  //1 创建食物DOM对象
  var foodElement = document.createElement('div')
  // 将食物的DOM对象添加this
  this.foodElement = foodElement
  //2 给DOM设置样式
  foodElement.style.width = this.width +'px'
  foodElement.style.height = this.height +'px'
  foodElement.style.backgroundColor= this.bgColor
  //计算随机的位置
  this.x= parseInt(Math.random()*(target.offsetWidth/this.width))
  this.y= parseInt(Math.random()*(target.offsetHeight/this.height))
  //设置位置
  foodElement.style.position='absolute'
  foodElement.style.left= this.x *this.width+'px'
  foodElement.style.top = this.y*this.height+'px'
  //3 将创建好的元素放到页面上
  //3 将DOM对象追加到页面上
  target.appendChild(foodElement)
}