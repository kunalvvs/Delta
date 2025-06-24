
let one = document.querySelector(".one");
let two = document.querySelector(".two");

let btn = document.querySelector("button");

btn.addEventListener("click", function () {
    if (one.classList.contains("hidden")) {
        one.classList.remove("hidden");
        two.classList.add("hidden");
    } else {
        one.classList.add("hidden");
        two.classList.remove("hidden");
    }
});