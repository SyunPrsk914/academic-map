document.getElementById("suggest-btn").onclick=()=>{

document.getElementById("suggest-panel").classList.add("open")

}

document.getElementById("close-suggest").onclick=()=>{

document.getElementById("suggest-panel").classList.remove("open")

}

document.getElementById("submit-suggestion").onclick=()=>{

const name=document.getElementById("s-name").value
const type=document.getElementById("s-type").value
const parent=document.getElementById("s-parent").value
const description=document.getElementById("s-description").value

if(!name || !parent){

document.getElementById("suggest-msg").innerText="Missing fields"
return

}

const suggestion={

id:name,
type:type,
parent:parent,
description:description

}

let suggestions=JSON.parse(localStorage.getItem("suggestions")||"[]")

suggestions.push(suggestion)

localStorage.setItem("suggestions",JSON.stringify(suggestions))

document.getElementById("suggest-msg").innerText="Suggestion saved"

}
