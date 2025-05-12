console.log("This Keyword Started ................");

let student = {
    name: "Kunal",
    age: 23,
    marks: 34,
    getValue() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Marks: ${this.marks}`);
    }
}

student.getValue();

