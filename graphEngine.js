let nodes=[]
let links=[]

let svg
let container
let simulation

let nodeElements
let linkElements
let labelElements

const width=window.innerWidth
const height=window.innerHeight

function initializeGraph(){

svg=d3.select("#graph")
.append("svg")
.attr("width",width)
.attr("height",height)

container=svg.append("g")

const zoom=d3.zoom()
.scaleExtent([0.2,5])
.on("zoom",event=>{
container.attr("transform",event.transform)
})

svg.call(zoom)

simulation=d3.forceSimulation()
.force("link",d3.forceLink().id(d=>d.id).distance(180))
.force("charge",d3.forceManyBody().strength(-800))
.force("center",d3.forceCenter(width/2,height/2))
.force("collision",d3.forceCollide().radius(d=>d.size+15))

}

function renderGraph(){

container.selectAll("*").remove()

linkElements=container.append("g")
.selectAll("line")
.data(links)
.enter()
.append("line")
.attr("class","link")

nodeElements=container.append("g")
.selectAll("circle")
.data(nodes)
.enter()
.append("circle")
.attr("class","node")
.attr("r",d=>d.size)
.attr("fill",colorNode)
.on("click",nodeClicked)

labelElements=container.append("g")
.selectAll("text")
.data(nodes)
.enter()
.append("text")
.text(d=>d.id)
.attr("font-size",d=>d.size/2)
.attr("text-anchor","middle")

simulation.nodes(nodes).on("tick",tick)

simulation.force("link").links(links)

simulation.alpha(1).restart()

}

function tick(){

linkElements
.attr("x1",d=>d.source.x)
.attr("y1",d=>d.source.y)
.attr("x2",d=>d.target.x)
.attr("y2",d=>d.target.y)

nodeElements
.attr("cx",d=>d.x)
.attr("cy",d=>d.y)

labelElements
.attr("x",d=>d.x)
.attr("y",d=>d.y+4)

}

function colorNode(d){

switch(d.type){

case "field": return "#2563eb"
case "subfield": return "#10b981"
case "concept": return "#f59e0b"
case "technology": return "#8b5cf6"
case "person": return "#ef4444"
case "organization": return "#14b8a6"

default: return "#64748b"

}

}

function highlightConnections(node){

nodeElements.style("opacity",0.15)
linkElements.style("opacity",0.05)
labelElements.style("opacity",0.15)

nodeElements.filter(d=>d.id===node.id).style("opacity",1)

linkElements
.filter(d=>d.source.id===node.id||d.target.id===node.id)
.style("opacity",1)

nodeElements.filter(d=>{

return links.some(l=>

(l.source.id===node.id && l.target.id===d.id) ||
(l.target.id===node.id && l.source.id===d.id)

)

}).style("opacity",1)

}

function nodeClicked(event,node){

highlightConnections(node)
showNodeInfo(node)
loadClusterIfNeeded(node)

}

async function loadClusterIfNeeded(node){

if(node.clusterLoaded) return

if(node.clusterFile){

const cluster=await fetch(node.clusterFile).then(r=>r.json())

nodes.push(...cluster.nodes)
links.push(...cluster.links)

node.clusterLoaded=true

renderGraph()

}

}
