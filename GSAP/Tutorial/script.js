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