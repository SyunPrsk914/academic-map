async function start(){

initializeGraph()

const data=await fetch("data/fields.json").then(r=>r.json())

nodes=data.nodes
links=data.links

renderGraph()

}

start()
