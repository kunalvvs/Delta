//first API request
let p1 = document.querySelector("div");  

let url = "https://catfact.ninja/fact";

fetch(url)
.then((res)=>{
    
    return res.json();
})
.then((data)=>{
    console.log("Data 1 ",data.fact);
    p1.innerText = data.fact;
    return fetch(url);
})
.then((res)=>{
    return res.json();
})
.then((data2)=>{
    console.log("Data 2 ",data2.fact);
    p1.innerText = data2.fact;
})
.catch((err)=>{
    console.log("Error is ",err);
});


//using asynch and await

async function Get() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log("Data 1 ",data.fact);

        let res = await fetch(url);
        let data2 = await res.json();
        console.log("Data 2 ",data2.fact);
    }
    catch(e)
    {
        console.log("Error is ",e);
    }
    
}

Get();
