const box = document.querySelector('.box');

gsap.to(box, {
    duration: 2,
    x: 300,
    rotation: 360,
    scale: 1.5,
    backgroundColor: '#e74c3c',
    borderRadius: '50%',
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true
});