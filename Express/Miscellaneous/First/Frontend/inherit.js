//Inheritance 
class Animal {
    constructor(name) {
        this.name = name;
        }
        speak() {
            console.log("Generic animal sound");
            }
}
let a = new Animal();
a.speak(); // Generic animal sound
//Inheritance
class Dog extends Animal {
    speak() {
        console.log("Woof!");
        }
        }
        let d = new Dog();
        d.speak(); // Woof!
        