
let tl = gsap.timeline();

tl.from("h1",{
    y: -20,
    duration: 1,
    opacity: 0

})
.from("h3",{
    y:-20,
    duration: 1,
    opacity:0,
    stagger: .3
})
.from("#intro",{
    y:90,
    duration:1,
    opacity:0,
    scale: .2
})
.to("body",{
    backgroundColor: "white",
    color: "black",
    duration:1
})
