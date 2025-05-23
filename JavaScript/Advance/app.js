

//call stack concept
function one()
{
    return 1;
}

function two()
{
    return one() + one();
}

function three(){
    let ans = two() +one();
    console.log(ans);
}

three();

//callback hell or nesting

let h1 = document.querySelector("h1");

function changeColor(color,delay,nextColor)
{
    setTimeout(()=>{
        h1.style.color=color;
        if (nextColor()) nextColor;
    },delay);
    
}

changeColor("red",1000,()=>{
    changeColor("blue",1000,()=> {
        changeColor("green",1000 );
     });
});

//promises

function saveDB(data){
    return new Promise((resolve,reject)=>{
        let internetSpeed = Math.floor( Math.random()*10)+1;
        if( internetSpeed > 4)
        {
            resolve("Sucesss promise is resolves");
        }
        else
        {
            reject("Promise is Failed");
            }
});
}
// let request = saveDB("apna college"). then .catch  // request - > promise object
saveDB("apna college")
.then((result)=>{
    console.log("Data1 saved");
    console.log("Result : ",result);
    //console.log(request);
    return saveDB("kunal");
})
.then ((result)=>{
    console.log("Data2 saved");
     console.log("Result : ",result);
    return saveDB("coding");
})
.then((result)=>{
    console.log("Data3 saved");
     console.log("Result : ",result);
})
.catch((error)=>{
    console.log("Data not saved");
     console.log("Error : ",error);
});


//upgraded code with promise of initial code of call back hell

let p = document.querySelector("#promise");

function changeColortwo(color,delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>
            {
                p.style.color = color;
                resolve();
                },delay);
    });
}

changeColortwo("red",1000)
.then(()=>{
    console.log("Red color completed");
    return changeColortwo("green",1000);
})
.then(()=>{
    console.log("Green color completed");
    return changeColortwo("blue",1000);
})
.then(()=>{
    console.log("Blue color completed");
       return changeColortwo("yellow",1000);
})
.then(()=>{
    console.log("Yellow color completed");
});