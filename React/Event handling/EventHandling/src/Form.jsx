function handleFormSubmit(event){
 event.preventDefault();  //it prevent form action 
console.log("Form was submitted");
}



export default function Form() {
  return (
<form onSubmit={handleFormSubmit}>
 < input placeholder="write something" />

<button>Submit the form</button>
</form>
);
}