function showNodeInfo(node){

document.getElementById("info-panel").classList.add("open")

document.getElementById("node-title").innerText=node.id
document.getElementById("node-type").innerText="Type: "+node.type
document.getElementById("node-description").innerText=node.description || ""

}

document.getElementById("close-panel").onclick=()=>{

document.getElementById("info-panel").classList.remove("open")

nodeElements.style("opacity",1)
linkElements.style("opacity",0.35)
labelElements.style("opacity",1)

}

document.getElementById("search-btn").onclick=()=>{

const term=document.getElementById("search-box").value

searchNode(term)

}

document.getElementById("reset-btn").onclick=()=>{

renderGraph()

}
