let arr=[1,2,3];
let arr2=[2,4,3];

arr.setHello = () =>{console.log("Hello")};      //custom prototype
arr2.setHello = () =>{console.log("Hello")};



//factory function
function personMaker(name,age){
    const person = {
        name:name,
        age:age,
        talk() {
            console.log(`hi I am ${name}`);
        },
    };
    return person;
}
 
let p1 = personMaker("Kevin",23);
console.log(p1);
p1.talk();
//end factory function 

console.log("------------------------------------");
//constructor with new keyword or operator
function Person(name,age){
        this.name=name;
        this.age=age;
        }
        
    Person.prototype.talk = function(){
        console.log(`hi I am ${this.name}`)};

            
    let p2 = new Person("KeLvin",23);
    console.log(p2);
    p2.talk();
//end constructor with new keyword or operator

console.log("------------------------------------");

//class with constructor
class PersonClass {
    constructor(name,age) {
        this.name=name;
        this.age=age;
        }

    talk()
    {
        console.log(`Hi i am ${this.name}`);
    }
    }

let print = new PersonClass("Shubh",21);
console.log(print);
print.talk();