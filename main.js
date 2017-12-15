var canvas = document.getElementById('xxx');

var context = canvas.getContext('2d');

autoSetConvasSize(canvas)

listenToMouse(canvas)

var eraserEnabled = false
eraser.onclick = function() {
  eraserEnabled = true
  actions.className='actions x'
}
brush.onclick=function(){
    eraserEnabled = false
  actions.className='actions'
}

/*****************/

function autoSetConvasSize(canvas) {
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
  context.lineWidth = 5
  context.lineTo(x2, y2) //终点
  context.stroke()
  context.closePath()
}

function listenToMouse(canvas) {

  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  canvas.onmousedown = function(aaa) {
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