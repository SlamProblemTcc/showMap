"use strict";

function drawLinks() {
  for (var i = 0; i < circlesPositionArray.length - 1; i++) {
    var link = {
      source: circlesPositionArray[i],
      target: circlesPositionArray[i + 1]
    }

    d3.selectAll("svg")
      .append("line")
      .attr("class", "link")
      .attr("x1", link.source.x)
      .attr("y1", link.source.y)
      .attr("x2", link.target.x)
      .attr("y2", link.target.y)
      .attr("id", "link" + i);
  }
}

function assembleObjects(data) {
  var posX = data.pontoX;
  var posY = data.pontoY;
  for (var i = 0; i < posX.length; i++) {
    circlesPositionArray.push({
      x: (width / 2) + (posX[i])*10,
      y: (height / 2) - (posY[i])*10
    })
  }
  console.log(circlesPositionArray);

}

function drawCircles() {

  d3.select("body")
    .selectAll("div")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black");
  
  d3.selectAll("svg")
    .append("rect")
    .attr("x", width/2-275)//fazendo com que o meio da caixa fique no lugar certo
    .attr("y", height/2-225)//fazendo com que o meio da caixa fique no lugar certo
    .attr("width", 550)
    .attr("height", 450)
    .attr("class", "box");

  for (var i = 0; i < circlesPositionArray.length; i++) {
    d3.selectAll("svg")
      .append("circle")
      .attr("cx", circlesPositionArray[i].x)
      .attr("cy", circlesPositionArray[i].y)
      .attr("r", radius)
      .attr("id", "circle" + i)
      .attr("class", "dot")
      .append("title")
      .text(circlesPositionArray[i].x+","+circlesPositionArray[i].y);
  }

}

function drawCartesianPlot() {
  d3.selectAll("svg")
    .append("line")
    .attr("class", "link_cartesian")
    .attr("x1", (width / 2))
    .attr("y1", 0)
    .attr("x2", (width / 2))
    .attr("y2", height);

  d3.selectAll("svg")
    .append("line")
    .attr("class", "link_cartesian")
    .attr("x1", 0)
    .attr("y1", height / 2)
    .attr("x2", width)
    .attr("y2", height / 2);
}

$.getJSON('mapa.json', function(data){
  console.log(data.pontoX);

  assembleObjects(data);
  drawCircles();
  drawLinks();
  drawCartesianPlot();
});
