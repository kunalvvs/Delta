
gsap.from("#page1 #box",{
    duration:2,
    delay:1,
    rotate:360
})

gsap.from("#page2 h1",{
        x:500,
        duration:2,
        opacity:0,
    scrollTrigger:{
        trigger: "#page2 h1",
       scroller: "body",
       start: "top 50%"
    }
})

// gsap.from("#page2 #box",{
//     duration:2,
//     delay:1,
//     rotate:360,
//     scrollTrigger: {
//         trigger: "#page2 #box",
        
//     }
// })
gsap.from("#page3 #box",{
    duration:2,
    delay:1,
    rotate:360,
    scrollTrigger: {
        trigger: "#page3 #box"
    }
})


