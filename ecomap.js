
$(function () {

  var connector;
  var x;
  var y;
  var s = Snap("#svg");

  var bigCircle = s.circle(150, 150, 50);
  var bigDem = bigCircle.getBBox();
  bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 5
  }).click(function () {
  
    s.rect(bigDem.cx + bigDem.r2, bigDem.cy - bigDem.r2, 50, 50).attr({
      fill: "#f00",
      stroke: "#000",
      strokeWidth: .5,
      id: "menu_add",
    }).click(function () {
      var id = guid();
      var newC = s.circle(bigDem.cx + bigDem.r2 + 100, bigDem.cy - bigDem.r2 + 10, 10)
        .attr({
          fill: "#0f0",
          stroke: "#000",
          strokeWidth: 1,
          id: "Circle_" + id
        }).drag(onMove, onStart, onEnd);
      s.line(bigDem.cx, bigDem.cy, newC.getBBox().cx, newC.getBBox().cy).attr({ stroke: "#00f300", id: "Line_" + id })

    });
  }, function () {
    Snap("#menu_add").remove();
  });

  var smallCircle = s.circle(400, 150, 25);
  smallCircle.addClass("draggable").attr({ id: "Circle_0" }).drag(onMove, onStart, onEnd);

  var smallDem = smallCircle.getBBox();
  connector = s.line(bigDem.cx, bigDem.cy, smallDem.cx, smallDem.cy);
  connector.attr({ stroke: '#000', id: "Line_0" });
  bigCircle.remove();
  s.append(bigCircle);

  function onMove(dx, dy, x, y) {
    this.attr({
      cx: +x,
      cy: +y

    });
    Snap("#Line_" + this.node.id.split('_')[1]).attr({ x2: +x, y2: +y });
  };
  function onStart() {

  }
  function onEnd(event) {

  }
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
});
