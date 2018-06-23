/**
 * Created by Administrator on 2018/4/25.
 */
//
function Snake(options) {
  options = options || {}
  this.width = options.width || 20
  this.height = options.height || 20
  this.headColor = options.headColor || 'red'
  this.bodyColor = options.bodyColor || 'blue'
  //添加方向属性
  this.direction = 'right'

  //核心
  this.body = [
    {x: 2, y: 0},//蛇头
    {x: 1, y: 0},
    {x: 0, x: 0}
  ]
}
Snake.prototype.render = function (target) {
  //思路
  //因为蛇由很多个关节,所以,我们需要为每一个关节分别创建一个DOM元素,并且渲染在页面中
  //来表示整条蛇
  //1 遍历蛇body
  for (var i = 0; i < this.body.length; i++) {
    // 2 分别为每一节创建一个span元素
    var span = document.createElement('span')
    //3 为每一span设置样式
    span.style.width = this.width + 'px'
    span.style.height = this.height + 'px'
    if (i === 0) {
      span.style.backgroundColor = this.headColor
    } else {
      span.style.backgroundColor = this.bodyColor
    }
    //设置位置
    span.style.position = 'absolute'
    span.style.left = this.body[i].x * this.width + 'px'
    span.style.top = this.body[i].y * this.height + 'px'
    //4 将每一span追加到页面中
    target.appendChild(span)
  }
}

// 让蛇动起来
Snake.prototype.move = function (target, food) {
  //思路
  //1 创建一个新的蛇节
  // 2 这个蛇节默认位置与蛇头的位置相同
  var newNode = {
    x: this.body[0].x,
    y: this.body[0].y
  }
// 3 根据移动的方向来决定如何修改 这个新节的坐标
  switch (this.direction) {
    case 'right':
      newNode.x++
      break
    case 'left':
      newNode.x--
      break
    case 'up':
      newNode.y--
      break
    case 'down':
      newNode.y++
      break
  }
  //我们将蛇吃食物的逻辑放在此处,因此,此处 newNode  才是最新蛇头的位置
  //判断 蛇头的坐标 是否 与食物的坐标 完全相同,如果相同表示要吃食物了
  if (newNode.x === food.x && newNode.y === food.y) {
    // 1 吃掉食物,蛇节追加一节 , 这样就不要删去原来的pop 的那一节了
    // 2 将被吃掉的食物的DOM对象 ,从页面上删去
    // 注意 先删原来的食物DOM 对象,在新建食物DOM
    target.removeChild(food.foodElement)
    //因为食物被吃掉,所以,应该再重新生成 一个食物. render () 就会新生成一个食物
    food.render(target)
  }else{
    //如果没有吃掉,就继续删除
    // 5 将数组的最后一项删除
    this.body.pop()
  }
  //4 将这个新节插入到body 数组中
  this.body.unshift(newNode)

  //6 蛇动起来的思路 : 先删除 原来的蛇对应的DOM对象, 再根据最新的蛇节来渲染新的蛇
  //删除原来的蛇对应的DOM 对象
  var spans = document.querySelectorAll('span')
//  console.log(spans);
  for (var i = 0; i < spans.length; i++) {
    target.removeChild(spans[i])
  }
  // 调用 render 方法重新渲染蛇对应的DOM对象
  this.render(target)
}