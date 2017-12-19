var canvas = document.getElementById('xxx');

var context = canvas.getContext('2d');

var lineWidth = 5

autoSetCanvasSize(canvas)

listenToUser(canvas)



var eraserEnabled = false
pen.onclick=function(){
  eraserEnabled=false
  pen.classList.add('active')
  eraser.classList.remove('active')
  clear.classList.remove('active')
  save.classList.remove('active')  
}
eraser.onclick=function(){
  eraserEnabled=true
  eraser.classList.add('active')
  pen.classList.remove('active')
  clear.classList.remove('active') 
  save.classList.remove('active')  
}
clear.onclick=function(){
  context.clearRect(0,0,canvas.width,canvas.height);
  eraserEnabled=true  
  clear.classList.add('active')  
  eraser.classList.remove('active')
  pen.classList.remove('active')
  save.classList.remove('active')  
}
save.onclick=function(){
  var url=canvas.toDataURL("image/png")
  var a=document.createElement('a')
  document.body.appendChild(a)
  a.href=url
  a.save='我的画'
  a.target='_blank'
  a.click()
  eraserEnabled=true  
  save.classList.add('active')
  clear.classList.remove('active')  
  eraser.classList.remove('active')
  pen.classList.remove('active')

}
black.onclick=function(){
  context.fillStyle='black'
  context.strokeStyle='black'
  black.classList.add('active')
  gray.classList.remove('active')  
  red.classList.remove('active')  
  green.classList.remove('active')
  blue.classList.remove('active')
  yellow.classList.remove('active')  
}
gray.onclick=function(){
  context.fillStyle='gray'
  context.strokeStyle='gray'
  black.classList.remove('active')
  gray.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick=function(){
  context.fillStyle='red'
  context.strokeStyle='red'
  black.classList.remove('active')
  gray.classList.remove('active')  
  red.classList.add('active')
  yellow.classList.remove('active') 
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick=function(){
  context.fillStyle='green'
  context.strokeStyle='green'
  black.classList.remove('active') 
  gray.classList.remove('active')    
  red.classList.remove('active')
  yellow.classList.remove('active')   
  green.classList.add('active')
  blue.classList.remove('active')
}
blue.onclick=function(){
  context.fillStyle='blue'
  context.strokeStyle='blue'
  black.classList.remove('active')
  gray.classList.remove('active')      
  red.classList.remove('active')
  yellow.classList.remove('active')   
  green.classList.remove('active')
  blue.classList.add('active')
}
yellow.onclick=function(){
  context.fillStyle='yellow'
  context.strokeStyle='yellow'
  black.classList.remove('active')
  gray.classList.remove('active')   
  red.classList.remove('active')
  yellow.classList.add('active') 
  green.classList.remove('active')
  blue.classList.remove('active')
}
thin.onclick=function(){
  lineWidth=5
}
thick.onclick=function(){
  lineWidth=10
}
/*****************/

function autoSetCanvasSize(canvas) {
  setConvasSize()
  window.onresize = function() {
    setConvasSize()
  }

  function setConvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1); //起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) //终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  //特性检测
  if(document.body.ontouchstart!==undefined){
    //触屏设备
    canvas.ontouchstart=function(aaa){     
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log('开始触摸')
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove=function(aaa){
      console.log('正在触摸')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if(!using){
        return
      }
      if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
      } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
    }
    canvas.ontouchend=function(aaa){
      console.log('结束')
      using = false    
    }
  }else{
    //非触屏设备
    canvas.onmousedown = function(aaa){   
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(aaa) {   
      var x = aaa.clientX
      var y = aaa.clientY
      if(!using){
        return
      }
      if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
      } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
    }
    canvas.onmouseup = function(aaa) {        
      using = false
    }  
  }
}
