/**
 * Created by Administrator on 2018/4/25.
 */
// 1 创建构造函数
function Game(map) {
  //添加食物对象
  this.food = new Food()
  // 添加蛇对象
  this.snake = new Snake()
//    console.log(this.snake);
  //添加地图
  this.map = map
}
// 2 给原型对象中添加 开始有游戏 的方法
Game.prototype.start = function () {
  //将this 存储到一个变量中, 目的是为了在定时器函数内部获取这个this
  var that = this
  // 让游戏开始要做什么???
  //1 渲染食物
  this.food.render(this.map)
  //2 渲染蛇
  this.snake.render(this.map)
  // 2.1 给document 判定按键事件, 来监听 上下左右 方向键按下的事件
  document.addEventListener('keyup', function (event) {
    //如何获取 当前的键值???
    //通过事对象 event 来获取
//      console.log(event.keyCode);
    switch (event.keyCode) {
      case 38:
        //上
        //判断方向是不是与当前相反 , 如果相反 ,就不执行如何错误
        if (that.snake.direction === 'down') {
          return
        }
        that.snake.direction = 'up'
        break
      case 40:
        //下
        if (that.snake.direction === 'up') {
          return
        }
        that.snake.direction = 'down'
        break
      case 39:
        //右
        if (that.snake.direction === 'left') {
          return
        }
        that.snake.direction = 'right'
        break
      case 37:
        //左
        if (that.snake.direction === 'right'){
          return
        }
        that.snake.direction = 'left'
        break
    }
  })
  // 3 让蛇动起来
  // 注意 : 每一函数都有自己的this
  //        定时器中的this 是 :window
  //         如何在定时器内部,获取到外部的this? 通过一个中间变量that获取
  var timeId = setInterval(function () {
    //    that.snake.move(this.map)
    that.snake.move(that.map, that.food)//!!!
    //判断蛇有没有撞墙
    // 1 获取到蛇头坐标
    var head = that.snake.body[0]
    // 2 分别判断上下左右四个边有没有撞墙,如果撞墙了提示游戏结束,并且提示清除定时器
    if (head.x < 0 || head.y < 0 || head.x > ((that.map.offsetWidth / that.snake.width) - 1) || head.y > ((that.map.offsetHeight / that.snake.height) - 1)) {
      alert('Game Over,游戏结束^_^')
      //清除定时器
      clearInterval(timeId)
    }
    //吃自己时输需要要从第四节开始
    for (var i = 4; i < that.snake.body.length; i++) {
      if (head.x === that.snake.body[i].x && head.y === that.snake.body[i].y) {
        alert('输了')
        clearInterval(timeId)
      }
    }
  }, 200)
}