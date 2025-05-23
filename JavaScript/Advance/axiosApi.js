let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let fact = await getFacts();
    console.log(fact);
    let p = document.querySelector("#result");
    p.innerText = fact;
});

let url = "https://catfact.ninja/fact";

async function getFacts() {
    try {
        let res = await axios.get(url);
        return res.data.fact;
    } catch (e) {
        console.log("error - ", e);
        return "No fact found";
    }
}


//dog image api

let url2 = "https://dog.ceo/api/breeds/image/random";

let btn1 = document.querySelector(".btn1");
btn1.addEventListener("click", async () => {
    let link = await getImage();
    let img = document.querySelector("#img");
    img.setAttribute("src", link);
});

async function getImage() {
    try {
        let res = await axios.get(url2);
        return res.data.message;
    } catch (e) {
        console.log("error - ", e);
        return "/";
    }
}