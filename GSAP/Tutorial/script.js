const box = document.querySelector('.box');

gsap.to(box, {
    duration: 2,
    x: 1400,
    rotation: 360,
    scale: 1.5,
    backgroundColor: '#e74c3c',
    borderRadius: '50%',
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true
});


gsap.from("h1",{
    opacity:0,
    duration:2,
    y:30,
    stagger:1,
    delay:1
})

// Create a timeline instance
let tl = gsap.timeline();

// Add tweens to the timeline to create a sequence
// tl.to(".box", { duration: 1, x: 100 })
//   .to(".box", { duration: 1, y: 100, backgroundColor: "red" })
//   .to(".box", { duration: 1, opacity: 0 });
