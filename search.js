function searchNode(term){

term=term.toLowerCase()

const result=nodes.find(n=>n.id.toLowerCase().includes(term))

if(!result) return

zoomToNode(result)

}

function zoomToNode(node){

const scale=1.7

const transform=d3.zoomIdentity
.translate(window.innerWidth/2-scale*node.x,
window.innerHeight/2-scale*node.y)
.scale(scale)

d3.select("svg")
.transition()
.duration(700)
.call(d3.zoom().transform,transform)

}
