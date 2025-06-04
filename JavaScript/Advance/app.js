

//call stack concept
console.log("-------------Call Stack-----------------");
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
        console.log("-------------Callback Hell-----------------");
        h1.style.color=color;
        if (nextColor) {nextColor}
    },delay);
    
}
//using call back hell color changing
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
     console.log("-------------Promises-----------------");
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
                console.log("-------------Color using promise-----------------");
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

//async keyword 

async function print() {
    
    return "hello";
}

print()
.then((result)=>{
    console.log("-------------Async-----------------");
    console.log("Promise is resolved ",result);
})
.catch ((error)=>{
    console.log("Promise is rejected",error);
});

//await
let aw = document.querySelector("#await");

function Colorawait(color,delay)
{
    return new Promise((resolve,reject)=>
        {
            setTimeout(()=>
                {
                    let n = Math.floor(Math.random()*10)+1;
                    if(n>10)
                    {
                        return reject("Rejected await ");
                    }

                    console.log("-------------Color using await-----------------");
                    aw.style.color = color;
                    resolve("color changes using await");
                    },delay);
                    });
                    
}

async function demo() {
    try{      //it can be handle the rejection 
    await Colorawait("red",1000);
    await Colorawait("yellow",1000);
    await Colorawait("green",1000);
    await Colorawait("blue",1000);
    } catch(err){
      console.log("Reject caught",err);
    }
}

demo();

//JSON

let jsxon = '{"fact":"Phoenician cargo ships are thought to have brought the first domesticated cats to Europe in about 900 BC.","length":105}';

let printJson = JSON.parse(jsxon);   //JSON to JS Object
console.log("JSON to Object->" ,printJson.fact);

let stu = {
    name : "Kunal",
    age : 4
};

let convertJson = JSON.stringify(stu);   //JS Object to JSON
console.log("Converted JSON -> " ,convertJson);     

